import { DataSource } from 'typeorm';

// TODO: Merge this datasource with teh database module
// TODO: Use env() to distinguish between environments

import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const dbConfig: PostgresConnectionOptions = {
	type: 'postgres',
	url: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/nest-backend',
	entities: ['dist/**/*.entity.js'],
	synchronize: true,
	migrations: ['dist/migrations/*{.ts,.js}'],
	migrationsRun: true,
};

export const dataSource = new DataSource(dbConfig);
