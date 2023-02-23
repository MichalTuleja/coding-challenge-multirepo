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

  @Put()
  async update(@Body() createPokemonDto: CreatePokemonDto) {
    this.pokemonsService.save(createPokemonDto);
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
