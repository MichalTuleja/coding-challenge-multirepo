### The Pokémon API Backend Coding Challenge

This project is created to show three features of Next.js.

- REST API
- Database handling, through TypeORM
- Authentication and access control

This solution is based on rather fundamental code, with multiple various customizations.
Solutions that might require further development are market with `TODO: ` prefix.

They are easy to find and browse with the VS Code `Gruntfuggly.todo-tree` extension.


### Installation

Make sure dependencies are met by running:

`npm install`

### Running

This example requires docker or a local MySQL installation. If using a local MySQL database, see `app.module.ts` for credentials, and make sure there are matching credentials in the database and the source code.

Update: Use environment file `.env` to set the database connection. For details check the file `database.module.ts`.

#### MySQL (by Docker)

There is a `docker-compose.yml` file for starting Docker.

`docker-compose up -d`

Check the logs to make sure the DB started properly.

`docker-compose logs -f mysql`


#### Seed the database

To seed the database with Pokemons execute the following command.

`npm run db:seed`

### Run the application

To run the application simply run it with npm.

`npm run start`

