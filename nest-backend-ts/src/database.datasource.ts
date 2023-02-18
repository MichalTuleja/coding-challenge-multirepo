import { DataSource } from 'typeorm';

// TODO: Merge this datasource with teh database module
// TODO: Use env() to distinguish between environments

export const dataSource = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'root',
	database: 'test',
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
