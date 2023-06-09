## This Project About

This project is to learn how to use nest.js, practice on how to implement a secure data request using jwt token, clean and concise code, and CRUD action to database.

## Dependencies Installation

```bash
$ npm install
```

## Running the app

```bash
# development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

http://localhost:<port>/docs or <web_host>/docs

## Create new project

1. run ' npx @nestjs/cli new crud-project ' on terminal to create new project.
2. cd into project folder.
3. run ' npm install @nestjs/swagger swagger-ui-express class-validator class-transformer sequelize sequelize-typescript pg pg-hstore ' on terminal.

## How to Set Up Sequelize Project

1. Install the Sequelize CLI globally by running npm install -g sequelize-cli.
2. Run ' sequelize init ' to initialize the Sequelize project and create config folder and models folder for database connection.

## Create Migration File

1. run ' sequelize migration:generate --name=<migration_name> ' on terminal

## Run Migration File

1. run ' sequelize db:migrate ' on terminal to run migration files
2. run ' sequelize db:migrate:undo ' on terminal to undo last migration file
