import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { PokemonsService } from './pokemons.service';
import { Repository } from 'typeorm';

const pokemonArray = [
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
  {
    "Attack": 52,
    "Defense": 43,
    "Generation": 1,
    "HP": 39,
    "Legendary": false,
    "Name": "Charmander",
    "Sp. Atk": 60,
    "Sp. Def": 50,
    "Speed": 65,
    "Total": 309,
    "Type 1": "Fire",
    "Type 2": "",
    "id": 5
  },
];

const onePokemon = pokemonArray[0];

describe('PokemonService', () => {
  let service: PokemonsService;
  let repository: Repository<Pokemon>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonsService,
        {
          provide: getRepositoryToken(Pokemon),
          useValue: {
            find: jest.fn().mockResolvedValue(pokemonArray),
            findOneBy: jest.fn().mockResolvedValue(onePokemon),
            save: jest.fn().mockResolvedValue(onePokemon),
            remove: jest.fn(),
            delete: jest.fn(),
            upsert: jest.fn().mockResolvedValue(onePokemon),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonsService>(PokemonsService);
    repository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    xit('should successfully insert a Pokemon', () => {
      expect(
        service.save({
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
        }),
      ).resolves.toEqual(onePokemon);
    });
  });

  describe('findAll()', () => {
    it('should return an array of Pokemons', async () => {
      const Pokemons = await service.findAll();
      expect(Pokemons).toEqual(pokemonArray);
    });
  });

  describe('findById()', () => {
    it('should get a single Pokemon', () => {
      const repoSpy = jest.spyOn(repository, 'findOneBy');
      expect(service.findById(1)).resolves.toEqual(onePokemon);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });

  xdescribe('remove()', () => {
    it('should call remove with the passed value', async () => {
      const removeSpy = jest.spyOn(repository, 'delete');
      const retVal = await service.remove('2');
      expect(removeSpy).toBeCalledWith('2');
      expect(retVal).toBeUndefined();
    });
  });

  describe('findAll()', () => {
    it('should calculate damage of two Pokemons with typeModifier = 1', async () => {
      const result = await service.calculateDamage(1, 2);
      expect(result).toEqual(30);
    });

    xit('should calculate damage of two Pokemons with non-std typeModifier (electric:water)', () => {});
    xit('should calculate damage of two Pokemons with non-std typeModifier (electric:rock)', () => {});
  });
});