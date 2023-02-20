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

  // TODO: Consider moving those two functions to a separate module/service
  async simulateRingFight(ids: number[]): Promise<Pokemon> {
    let ringFightWinner;
    const pokemons: Pokemon[] = await Promise.all(ids.map(id => this.findById(id)));

    type pokemonExt = {
      pokemon: Pokemon,
      defeated: boolean,
    };

    let pokemonArr: pokemonExt[] = pokemons.map((p) => ({ pokemon: p, defeated: false}));

    // Be careful, that function changes order
    const pickRandomTwo = (list: pokemonExt[]): pokemonExt[] => {
      const shuffled = list.sort(() => 0.5 - Math.random());
      return [shuffled[0], shuffled[1]];
    }

    const simulateFight = async (p1: pokemonExt, p2: pokemonExt): Promise<{ winner: pokemonExt, loser: pokemonExt }> => { // TODO: Add return type
      const damage1: number = await this.calculateDamage(p1.pokemon.id, p2.pokemon.id);
      const damage2: number = await this.calculateDamage(p2.pokemon.id, p1.pokemon.id);

      // In this scenario we check only one hit as that determines which Pokemon will be defeated sooner
      // Implementing random effects such as critical hit would make this algorithm more interesting
      // Ideally speed should be taken into account as it determines which Pokemon moves first

      if (damage1 > damage2) {
        return { winner: p1, loser: p2 };
      } else if (damage1 < damage2) {
        return { winner: p2, loser: p1 };
      } else {
        // coin toss
        const result: number = Math.random();
        if (result > 0.5) return { winner: p1, loser: p2 };
        else return { winner: p2, loser: p1 };
      }
    }

    // We pick a pokemon randomly each time
    // Alternatively we could use a binary tree
    for (let i = 0; i < pokemonArr.length ** 2; i++) { // Make sure the loop will finally end
      const winningPokemons = pokemonArr.filter((p) => p.defeated == false);
      if (winningPokemons.length == 1) {
        ringFightWinner = winningPokemons[0];
        break;
      }

      const [ pok1, pok2 ] = pickRandomTwo(winningPokemons.filter((p) => p.defeated == false));
      const { loser } = await simulateFight(pok1, pok2);
      loser.defeated = true;
    }

    return ringFightWinner.p;
  }
}
