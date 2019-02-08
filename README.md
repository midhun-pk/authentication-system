# Authentication System
> JSON Web Token (JWT) based authentication

A MEAN stack application demonstrating email verification feature and JWT based authentication without using any packages such as Passport.js. JWT as defined on [JWT.io](https://jwt.io/) is an open industry standard method for transfering information securely between two parties.

## Prerequisits

- Node.js
- MongoDB
- Angular-cli

## Installing / Getting started

Clone the repo and install dependencies:

```shell
git clone https://github.com/midhun-pk/authentication-system.git
cd authentication-system
npm install
cd client
npm install
cd ..
```

Start mongodb and run below commands:

```shell
npm run build
npm start
```

### Initial Configuration

Make necessary changes to **config.js** in **authentication-system/config/config.js**.

To activate email verification when signing up, make changes to **mailerAuthOptions** property in **config.js**.
Follow this [article](https://medium.com/@nickroach_50526/sending-emails-with-node-js-using-smtp-gmail-and-oauth2-316fe9c790a1) to get the **clientId, clientSecret, refreshToken** to set up OAuth2 which is a secure way of allowing the application to use gmail service.

## Developing

For frontend development:

```shell
cd authentication-system/client
ng serve
```

The above command starts a server at localhost:4200

### Building

To build the frontend:

```shell
cd authentication-system
npm run build
```

Folder **client/dist** will be created.

## Features

- Secure Email verification using OAuth 2.0
- Secure information ranser between client and server using JSON Web Tokens

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Licensing

"The code in this project is licensed under MIT license."





