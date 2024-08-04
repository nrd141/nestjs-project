## Games Database API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"></p>
    <p align="center">

## Description

A simple [Nest](https://github.com/nestjs/nest) Typescript API project for a games database. The API allows performing CRUD on games database stored on MongoDB. For security, the project implements authentication using JWT tokens and user logon.

## Pattern

This project follows the pattern of Module, Controller, and Service.
1. **Module**: Contains realted controllers and services in the project.
2. **Controller**: Handles HTTP requests and responses for a module.
3. **Service**: Contains business logic and interacts with the database for a module.

The  pattern is chosen for the following reasons:
- **Separation of Concerns**: Each module has a distinct responsibility, making the code easier to manage and understand.
- **Scalability**: New features can be added as new modules without affecting existing code.
- **Maintainability**: Changes in one part of the application do not affect other parts.


## Install dependencies

```bash
$ npm install
```

## Set up .env variables
```env
DB_URI=mongodb+srv://...(use MongoDB Atlas connection link)
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=1d
```

## Running the app

```bash
# development
$ npm run start
```

## Test

```bash
# e2e tests
$ npm run test:e2e
```

## Access API Documentation

Visit `http://localhost:3000/api` to view the Swagger documentation.


