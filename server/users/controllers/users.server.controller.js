'use strict';

/* 
 * Module dependencies
 */
const mailer = require('nodemailer'),
    jwt = require('jsonwebtoken'),
    User = require('../models/user.server.model'),
    Token = require('../models/token.server.model'),
    config = require('../../../config/config');

/* 
 * Signup with username, email and password
 * @param {Object} req: Express request object
 * @param {Object} res: Express response object
 */
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(401).send({ 'message': 'Please provide username, email and password' });

    try {
        // Create account for this user.
        const newUser = new User({ username, email, password });
        let user = await newUser.save();

        // Create confirmation token for this user
        const newToken = new Token({ user: user._id });
        let token = await newToken.save();

        // Send verification link to the user's email'.
        let mailResponse = await sendVerificationMail(user, token);
        return res.status(201).send({ 'message': `A verification email has been sent to ${user.email}` })

    } catch (error) {
        if (error.name === 'MongoError') {
            // If account already exist for the user.
            if (error.code === 11000) return res.status(409).send({ 'message': 'Account already exists for this email address.' });
        }
        return res.status(500).send({ 'message': error });
    }
}

/*
 * Resend verification link to the user
 * @param {Object} req: Express request object
 * @param {Object} res: Express response object
 */
exports.resendVerificationMail = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(401).send({ 'message': 'Please provide email' });

    try {
        // Find a user with this email
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send({ 'message': 'Invalid email or password. Please try again.' });
        if (user.isVerified) return res.status(400).send({ 'message': 'User already verified' });

        // Create confirmation token for this user
        const newToken = new Token({ user: user._id });
        let token = await newToken.save();

        // Send verification link to the user's email'.
        let mailResponse = await sendVerificationMail(user, token);
        return res.status(201).send({ 'message': `A verification email has been sent to ${user.email}` });

    } catch (error) {
        return res.status(500).send({ 'message': error });
    }
}

/*
 * Sends verification link to the user
 * @param {Object} user
 * @param {String} OAuth access token
 * @returns {Promise} mailResponse
 */
const sendVerificationMail = async (user, token) => {
    const smtpTransport = mailer.createTransport({
        service: 'gmail',
        auth: config.mailerAuthOptions
    });
    const mailOptions = {
        from: config.mailerAuthOptions.EMAIL,
        to: user.email,
        subject: "Account Verification Token",
        generateTextFromHTML: true,
        html: `
            <span>Hi</span></br></br>
            <p>Please verify your account by clicking the link
               http://${config.domain || config.host + ':' + config.port}/user/verify/${token.token}
            </p>
            `
    };
    let mailResponse = await smtpTransport.sendMail(mailOptions);
    smtpTransport.close();
    return mailResponse;
}

/*
 * Verify users account.
 * Check whether token sent to user's email is valid or not
 * @param {Object} req: Express request object
 * @param {Object} res: Express response object
 */
exports.verifyUser = async (req, res) => {
    const { token } = req.params;
    try {
        // Find the token from mongodb
        const foundToken = await Token.findOne({ token });
        if (!foundToken) return res.status(400).send({ 'message': 'Token expired' });

        // Find the user to whom this token is sent
        const user = await User.findOne({ _id: foundToken.user });
        if (!user) return res.status(400).send({ 'message': 'Unable to find a user for this token' });
        if (user.isVerified) return res.status(400).send({ 'message': 'User already verified' });

        // Save user as a verified user
        await User.update({ _id: user._id }, { $set: { isVerified: true } });

        res.status(201).send({ message: 'User authenticated successfully. Please login to continue.' });

    } catch (error) {
        return res.status(500).send({ 'message': error });
    }
}

/*
 * Signin with email and password
 * @param {Object} req: Express request object
 * @param {Object} res: Express response object
 */
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(401).send({ 'message': 'Please provide email and password' });

    try {
        // Find a user with this email
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send({ 'message': 'Invalid email or password. Please try again.' });
        if (!user.isVerified) return res.status(401).send({ 'message': 'User not verified' });

        // Authenticate user by using password
        const isAuthenticated = user.authenticate(password);
        if (!isAuthenticated) return res.status(401).send({ 'message': 'Invalid email or password. Please try again.' });

        // Get json web token to grant access to future requests
        const token = getJwt(user);

        // Remove sensitive data and send response
        user.password = undefined;
        user.salt = undefined;
        res.status(200).send({ token, user });

    } catch (error) {
        return res.status(500).send({ 'message': error });
    }
}

/*
 * Generate json web token (jwt)
 * @param {Object} user: User document from mongodb
 * @param {string} token: json web token
 */
let getJwt = (user) => {
    const expires = config.auth.expires;
    const payload = { email: user.email, username: user.username, id: user._id }
    const token = jwt.sign(payload, config.auth.tokenSecret, {
        expiresIn: expires
    });
    return token;
}

/*
 * Signout user from the application
 * @param {Object} req: Express request object
 * @param {Object} res: Express response object
 */
exports.signout = async (req, res) => {

}