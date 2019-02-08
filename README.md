# Authentication System
> JSON Web Token (JWT) based authentication

A MEAN stack application demonstrating email verification feature and JWT based authentication without using any packages such as Passport.js. JWT as defined on [JWT.io](https://jwt.io/) is an open industry standard method for transfering information securely between two parties.

## Prerequisits

- Node.js
- MongoDB

## Installing / Getting started

```shell
git clone https://github.com/midhun-pk/authentication-system.git
cd authentication-system
npm install
```

Start mongodb and run below command:

```shell
npm start
```

### Initial Configuration

Make necessary changes to *config.js* in *authentication-system/config/config.js*.

To activate email verication on signing up, make changes to * mailerAuthOptions * property in * config.js *
Follow this [article](https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1) to get the *clientId, clientSecret, refreshToken* to set up OAuth2 which is a secure way of allowing the application to use gmail service.



