# The Pokémon API Backend

## Introduction

This project is created to show three features of Next.js.

- REST API
- Database handling, through TypeORM
- Authentication and access control

This solution is based on rather fundamental code, with multiple various customizations.
Solutions that might require further development are market with `TODO: ` prefix.

They are easy to find and browse with the VS Code `Gruntfuggly.todo-tree` extension.

## Scaling up the system

This service is written in the way allowing it running in multiple instances.

PostgreSQL scales well for heavy-read setups, unfortunately intensive writes decrease performance significantly. For consistency, the service will be still connected to one Postgres instance. Techniques as sharding and using multiple replicas increase its availability.

Another way to scale it up is to us Amazon AuroraDB. It is designed for scaling in distributed environments and increases those apps' capabilities significantly.

On self-hosted setups it is worth considering hardware that reduces disk write times to minimum. Switching to a distributed database, such as CassandraDB will increase availability.

Using Redis to keep user sessions makes it possible to use multiple instances of the same app. Redis can be also used for caching HTTP requests (improves reads).

## Installation

Make sure dependencies are met by running:

```bash
npm install
```

This example requires docker or a local Postgres installation. If using a local Postgres database, see `app.module.ts` for credentials, and make sure there are matching credentials in the database and the source code.

Update: Use environment file `.env` to set the database connection. For details check the file `database.module.ts`.

#### Postgres (by Docker)

There is a `docker-compose.yml` file for starting Docker.

```bash
docker-compose up -d
```

Check the logs to make sure the DB started properly.

```bash
docker-compose logs -f postgres
```

#### Configure database

Create an `.env` file to override the default settings.

```bash
DATABASE_URL="postgres://postgres:password@localhost:5432/nest-backend"
```

#### Create schema

```bash
npm run db:schema:sync
```

#### Seed the database

To seed the database with Pokemons execute the following command.

```bash
npm run db:seed
```

### Run the application

To run the application simply run it with npm.

```bash
npm run start
```

### Requesting the API

> It is recommended to use some HTTP client (HTTPie, cURL, Postman)

> The examples below are for HTTPie (`pip3 install httpie`)

#### Authentication (optional)

Firstly, create a user:

```bash
http POST :3000/users username=user password=pass
```

Authenticate with the credentials below:

> As the security features are disabled in this config, authentication is purely optional - I left it for a reference.

```bash
http POST :3000/auth/login username=user password=pass

{
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE2NzY4OTIyMzgsImV4cCI6MTY3Njg5MjI5OH0.X7BX21JKbANQp3KtuBa8vvUDAai7f-OptcWzRLLsW6M"
    }
}
```

Now you can use the token to perform various requests:

```bash
http -A bearer -a 'eyJhb...LsW6M' :3000/poke
```

#### Retrieving all items (GET)

```bash
http :3000/poke
```

#### Retrieving an item by ID (GET)

```bash
http :3000/poke/1
```

#### Creating an item (POST)

```bash
http POST :3000/poke Name=Dinosaur Defense=300000
```

#### Replacing an item (PUT)

```bash
http POST :3000/poke/1 Name=Dinosaur Defense=300000
```

## TODOs and additional features

The intention of this project is to present variety of capabilities available in Nest.js using TypeScript and TypeORM.

The list of potential features is long and will be added consecutively.

- [x] Basic CRUD
- [x] Authentication with Passport
- [x] Database backend with TypeORM
- [x] Authentication against the Database
  - [ ] Move sessions to Redis
- [ ] Roles (admin, user, etc.)
- [ ] Caching (Redis)
- [ ] Containerization (Docker)
- [x] Unit tests
  - [x] Service
  - [ ] Controllers
- [ ] API tests
  - [ ] `/poke`
  - [ ] `/users`
- [ ] Add pagination support

Minor potential improvements are marked as `TODO:` in the solution codebase (`src/` folder).

## License

This code is written by @MichalTuleja and distributed under MIT license.
