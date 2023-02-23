import { DataSource } from 'typeorm';

// TODO: Merge this datasource with teh database module
// TODO: Use env() to distinguish between environments

import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const dbConfig: PostgresConnectionOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'password',
	database: 'nest-backend',
	entities: ['dist/**/*.entity.js'],
	synchronize: true,
	migrations: ['dist/migrations/*{.ts,.js}'],
	migrationsRun: true,
};

export const dataSource = new DataSource(dbConfig);
