import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { PokemonsModule } from '../../src/pokemons/pokemons.module';
import { PokemonsService } from '../../src/pokemons/pokemons.service';
import { CoreModule } from '../../src/core/core.module';

describe('Pokemons', () => {
  const pokemonsService = { findAll: () => ['test'] };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PokemonsModule, CoreModule],
    })
      .overrideProvider(PokemonsService)
      .useValue(pokemonsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET pokemons`, () => {
    return request(app.getHttpServer()).get('/pokemons').expect(200).expect({
      data: pokemonsService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
