import { DataSource } from 'typeorm';

// TODO: Merge this datasource with teh database module
// TODO: Use env() to distinguish between environments

export const dataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'password',
	database: 'nest-backend',
	entities: [
		__dirname + '/../**/*.entity{.ts,.js}',
	],
	synchronize: true,
	// synchronize: false,
	// migrations: ['dist/migrations/1676332995841-seed-poke.js'],
	migrations: ['dist/migrations/*{.ts,.js}'],
	// migrationsTableName: "migrations",
	migrationsRun: false,
});
