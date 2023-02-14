import { Injectable, Dependencies } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  paginate,
} from 'nestjs-typeorm-paginate';

import * as fs from 'fs';
import { parse } from '@fast-csv/parse';

import { Poke } from './poke.entity';

@Injectable()
@Dependencies(getRepositoryToken(Poke))
export class PokeService {
  constructor(pokeRepository) {
    this.pokeRepository = pokeRepository;
  }

  async paginate(options) {
    const queryBuilder = this.pokeRepository.createQueryBuilder('poke');
    queryBuilder.orderBy('poke.id', 'ASC');

    return paginate(queryBuilder, options);
  }

  findAll() {
    return this.pokeRepository.find();
  }

  findOne(id) {
    return this.pokeRepository.findOneBy({ id });
  }

  async remove(id) {
    await this.pokeRepository.delete(id);
  }

  async save(row) {
    return this.pokeRepository.save(row);
  }

  // TODO: It would not hurt moving it to a separate class
  // poke.seeder.js
  seed() {
    const filePath = 'czr_pokemon_db.csv';

    fs.createReadStream(filePath)
      .pipe(parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', row => {
        this.save(row);
      })
      .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));
  }
}
