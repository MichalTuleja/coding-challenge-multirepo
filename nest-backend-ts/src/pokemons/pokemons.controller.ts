import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
// import { Pokemon } from './interfaces/pokemon.interface';
import { Pokemon } from './pokemon.entity';

@UseGuards(RolesGuard)
@Controller('poke')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Post()
  @Roles('admin')
  async create(@Body() createPokemonDto: CreatePokemonDto) {
    this.pokemonsService.save(createPokemonDto);
  }

  @Put()
  @Roles('admin')
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

  // @Get(':id')
  // async getById(@Param('id') id: number): Promise<string> {
  //   return `Hello ${id}`;
  // }

  // @Put(':id')
  // async updateById(@Param('id') id: number, @Body() updatePokemonDto: UpdatePokemonDto): Promise<string> {
  //   // TODO: Validate id

  //   // TODO: Update the entity

  //   return `OK ${id}`;
  // }

  // @Patch(':id')

  // @Get('calculate_damage')
  // getDamage(@Query() query): string {
  //   // TODO: Validate id1 to match pokemon id
  //   // TODO: Validate id2 to match pokemon id
  //   return `Hello ${query.id1} ${query.id2}`;
  // }
}
