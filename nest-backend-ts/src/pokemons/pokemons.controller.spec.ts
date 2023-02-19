import { Test } from '@nestjs/testing';
import { PokemonsController, DamageController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { Pokemon } from './pokemon.entity';

describe('PokemonsController', () => {
  let pokemonsController: PokemonsController;
  let pokemonsService: PokemonsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PokemonsController, DamageController],
      providers: [PokemonsService],
    }).compile();

    pokemonsService = moduleRef.get<PokemonsService>(PokemonsService);
    pokemonsController = moduleRef.get<PokemonsController>(PokemonsController);
  });

  describe('findAll', () => {
    xit('should return an array of pokemons', async () => {
      const result: Pokemon[] = [
        {
          "Attack": 49,
          "Defense": 49,
          "Generation": 1,
          "HP": 45,
          "Legendary": false,
          "Name": "Bulbasaur",
          "Sp. Atk": 65,
          "Sp. Def": 65,
          "Speed": 45,
          "Total": 318,
          "Type 1": "Grass",
          "Type 2": "Poison",
          "id": 1
        },
      ];
      jest.spyOn(pokemonsService, 'findAll').mockImplementation(async () => {
        console.log(result);
        return result
      });

      expect(await pokemonsController.findAll()).toBe(result);
    });
  });
});
