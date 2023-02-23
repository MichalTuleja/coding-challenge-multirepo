import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(Pokemon)
    private pokeRepository: Repository<Pokemon>,
  ) {}

  findAll(): Promise<Pokemon[]> {
    return this.pokeRepository.find();
  }

  async save(pokemon: Pokemon): Promise<void> {
    await this.pokeRepository.upsert(pokemon, ['id']);
  }

  findById(id: number): Promise<Pokemon> {
    return this.pokeRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.pokeRepository.delete(id);
  }
}
