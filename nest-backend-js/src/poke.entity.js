import { EntitySchema, Column, PrimaryGeneratedColumn } from 'typeorm';

const Poke = new EntitySchema({
    name: "Poke", // Will use table name `category` as default behaviour.
    tableName: "poke", // Optional: Provide `tableName` property to override the default behaviour for table name.
    columns: {
        id: {
            type: "int",
			primary: true,
            generated: true,
        },
        "Name": {
            type: "varchar",
        },
		"Type 1": {
			type: "varchar",
			nullable: true,
		},
		"Total": {
			type: "int",
			nullable: true,
		},
		"HP": {
			type: "int",
			nullable: true,
		},
		"Legendary": {
			type: "boolean",
			default: false,
			nullable: true,
		}
    },
});


export { Poke };
