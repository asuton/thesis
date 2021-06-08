# Thesis

Web application for a medical clinic. 
The application implements WebAuthn as an additional form of authentication from the user in case of executing sensitive operations.
Privacy and integrity are ensured by encrypting sensitive data. 
User access and capabilities are regulated by defined user roles and abilities for each role.

## Installation

### Prerequisites 
This project depends on npm, Node.js and PostgreSQL. The application implements WebAuthn so you will need to have an authenticator which supports CTAP2 or U2F. As an alternative you can use Virtual Authenticators which is a Chrome extenstion where you can add a new authenticator.

### Getting started
Clone repository  ```git clone https://github.com/asuton/thesis.git```

Create .env file in thesis/server directory
```env
PORT = 5000
POSTGRES_HOST = 
POSTGRES_PORT = 5432
POSTGRES_USER =
POSTGRES_DB = 
POSTGRES_DB_TEST = 
POSTGRES_PASSWORD = 
JWT_SECRET =
KEY =
HMAC_KEY = 
COOKIE_KEY = 
ADMIN_MAIL = 
ADMIN_PASSWORD = 
```

Run ```npm install``` in thesis/server and thesis/client directory

Create database in PostgreSQL

### Launch

#### Server

Before launching server you can run TypeORM seeding to add an admin and dummy doctor/patient accounts.

```npm run seed:run:development```

Run server
```npm run dev```

#### Client

Run client
```npm start```

### Setup server using Docker
Alternatively, you can run the server by running the command 
```
docker-compose up
```
in the thesis/server directory
Before running the command go to Docker settings under resources/file sharing and add the path to the project directory

Run TypeORM seeding
```
docker-compose exec app npm run seed:run:development
```

### Other commands
See server/package.json for other commands regarding schema and tests

## Used libraries and technologies

TypeScript, Express, TypeORM, TypeORM Seeding, CASL, React, Redux, Jest, Docker, Faker, Material-UI
