import { Controller, Dependencies, Get } from '@nestjs/common';
import { PokeService } from './poke.service';

@Controller('poke')
@Dependencies(PokeService)
export class PokeController {
  constructor(pokeService) {
    this.pokeService = pokeService;
  }

  @Get()
  async findAll() {
    // return [];
    return this.pokeService.findAll();
  }

  @Get('seed')
  async seed() {
    return this.pokeService.seed();
  }

}
