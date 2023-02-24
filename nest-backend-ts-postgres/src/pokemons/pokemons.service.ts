import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, UpdateResult, Repository } from 'typeorm';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
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

  async insert(pokemon: Pokemon): Promise<number> {
    const result: InsertResult = await this.pokeRepository.insert(pokemon);
    return result.identifiers[0]['id'];
  }

  async save(pokemon: Pokemon, id: number): Promise<Pokemon> {
    let setAll = (obj, val) => Object.keys(obj).forEach(k => obj[k] = val);
    const pokemonTemplate: Pokemon = new Pokemon();
    setAll(pokemonTemplate, null);

    console.log(pokemonTemplate);

    return this.pokeRepository.save({
      ...pokemonTemplate,
      ...pokemon,
      id,
    });
  }

  findById(id: number): Promise<Pokemon> {
    return this.pokeRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.pokeRepository.delete(id);
  }
}
