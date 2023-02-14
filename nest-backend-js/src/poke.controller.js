import { Controller, Dependencies, Get, Param, Bind, Req } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PokeService } from './poke.service';

@Controller('poke')
@Dependencies(PokeService)
export class PokeController {
  constructor(pokeService) {
    this.pokeService = pokeService;
  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    // return [];

    limit = limit > 100 ? 100 : limit;
    return this.pokeService.paginate({
      page,
      limit,
      route: 'http://localhost:3000/poke',
    });
    // return this.pokeService.findAll();
  }

  @Get(':id')
  @Bind(Req())
  findOne(request) {
    console.log(request)
    return this.pokeService.findOne(request.id);
  }

  @Get('seed')
  async seed() {
    return this.pokeService.seed();
  }

}
