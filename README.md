<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Advertisement Management API

This project is an API for managing advertisements, including features like pagination, filtering, sorting, JWT-based authentication, and role-based access control.

## Prerequisites

- **Node.js**: Version 20 or higher
- **pnpm**: Package manager
- **Docker**: Required for setting up PostgreSQL via Docker Compose. Alternatively, a locally installed PostgreSQL instance can be used.

## Getting Started

## 1. Install pnpm

If you don't have `pnpm` installed, you can install it globally:

```bash
npm install -g pnpm  
```

## 2. Install Dependencies
Use pnpm to install the project dependencies:
```bash
pnpm install
```

## 3. Configure the Environment Variables
Copy the .env.example file to a new .env file:
```bash
cp .env.example .env
```
Fill in the .env file with the required environment variables. Ensure they match your database and JWT configurations.


## 4. Set Up the Database
The project uses PostgreSQL as its database. You can set up PostgreSQL in two ways:

#### Option 1: Using Docker

Run the following command to start the PostgreSQL container:
```bash
docker-compose up
```

#### Option 2: Local PostgreSQL
If you prefer a local PostgreSQL setup, ensure that PostgreSQL is installed and running. Update the database configuration in your .env file to match your local PostgreSQL settings.

## 5. Database Initialization

Before running the application, you need to create the database and seed initial data, including cities, zip codes, and users with different roles (including an admin user who can manage advertisements).

#### Run Database Seed:
This will populate the database with initial data for cities, zip codes, and users (including an admin user).
```bash
pnpm run seed:run
```

## 6. Running the Application

### Development Mode

For development, use the following command to start the application with hot-reload:

```bash
pnpm run start:dev
```

### Production Mode
Build the application:
```bash
pnpm run build

pnpm run start:prod
```

## Additional Information

Admin User: The database seed creates an admin user who can manage advertisements. You can use this admin account for testing endpoints that require admin permissions.
Swagger Documentation: Swagger API documentation is available. Access it in the browser at after starting the application. 
```bash
http://localhost:8000/api
``` 


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
