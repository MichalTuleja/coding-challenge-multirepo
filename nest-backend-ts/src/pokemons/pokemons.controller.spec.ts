import { Test } from '@nestjs/testing';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';

describe('PokemonsController', () => {
  let pokemonsController: PokemonsController;
  let pokemonsService: PokemonsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PokemonsController],
      providers: [PokemonsService],
    }).compile();

    pokemonsService = moduleRef.get<PokemonsService>(PokemonsService);
    pokemonsController = moduleRef.get<PokemonsController>(PokemonsController);
  });

  describe('findAll', () => {
    it('should return an array of pokemons', async () => {
      const result: Pokemon[] = [
        {
          age: 2,
          breed: 'Bombay',
          name: 'Pixel',
        },
      ];
      jest.spyOn(pokemonsService, 'findAll').mockImplementation(() => result);

      expect(await pokemonsController.findAll()).toBe(result);
    });
  });
});
