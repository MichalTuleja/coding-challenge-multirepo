import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { Pokemon } from './interfaces/pokemon.interface';
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

  async calculateDamage(attackerId: number, defenderId: number): Promise<number> {
    const attacker = await this.findById(attackerId);
    const defender = await this.findById(defenderId);

    // TODO: Update the typeModifier logic to support the following logic:
    // - When the attacker type is electric and the defender is water it should return 2
    // - When the attacker type is electric and the defender is rock it should return 0.5
    // - Any other scenario should return 1
    const typeModifier = 1;

    const result = (30 * attacker.Attack / defender.Defense) * typeModifier;

    return result;
  }

  // async simulateRingFight(ids: number[]): Promise<Pokemon> {

  // }
}
