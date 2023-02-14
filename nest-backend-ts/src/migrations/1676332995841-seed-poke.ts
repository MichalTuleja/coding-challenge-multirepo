import { Cat } from 'src/pokemons/pokemon.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

import * as fs from 'fs';
import { parse } from '@fast-csv/parse';

export class seedPoke1676332995841 implements MigrationInterface {
  async getFromCSV(filePath): Promise<Cat[]> {
    return new Promise((resolve, reject) => {
      const rows = [];

      fs.createReadStream(filePath)
        .pipe(parse({ headers: true }))
        .on('error', (error) => {
          console.error(error);
          reject(error);
        })
        .on('data', (row) => {
          rows.push(row);
        })
        .on('end', (rowCount) => {
          console.log(`Parsed ${rowCount} rows`);
          resolve(rows);
        });
    });
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    const filePath = 'czr_pokemon_db.csv';

    const rows = await this.getFromCSV(filePath);

    await Promise.all(
      rows.map((row) => {
        return queryRunner.manager.save(
          queryRunner.manager.create<Cat>(Cat, row),
        );
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('answer', 'questionId');
  }
}
