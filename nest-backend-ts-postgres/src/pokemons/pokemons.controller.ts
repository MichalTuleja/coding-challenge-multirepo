import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './pokemon.entity';

// @UseGuards(JwtAuthGuard)
@Controller('poke')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  async create(@Body() createPokemonDto: CreatePokemonDto) {
    const id: number = await this.pokemonsService.insert(createPokemonDto);
    return this.pokemonsService.findById(id);
  }

  @Put(':id')
  async update(
    @Body() createPokemonDto: CreatePokemonDto,
    @Param('id', new ParseIntPipe()) id: number
  ) {
    await this.pokemonsService.save(createPokemonDto, id);
    return this.pokemonsService.findById(id);
  }

  @Get()
  async findAll(): Promise<Pokemon[]> {
    return this.pokemonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.pokemonsService.findById(id);
  }
}
