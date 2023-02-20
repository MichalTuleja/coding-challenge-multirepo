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
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './pokemon.entity';

@UseGuards(JwtAuthGuard)
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

@UseGuards(JwtAuthGuard)
@Controller('calculate_damage')
export class DamageController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  async getDamage(@Query() query): Promise<number> {
    // TODO: Validate id1 to match pokemon id
    // TODO: Validate id2 to match pokemon id

    return this.pokemonsService.calculateDamage(query.attackerId, query.defenderId);
  }
}

@UseGuards(JwtAuthGuard)
@Controller('ringfight')
export class RingFightController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  async getRingFightResult(@Query() query): Promise<Pokemon> {
    // TODO: Validate ids to match pokemon id
    // TODO: Validate if the list is length of 2, 4, 8, 16...
    // TODO: Validate for unique IDs before checking length

    const idsArray = query.ids.split(',');

    const ringFightWinner: Pokemon = await this.pokemonsService.simulateRingFight(idsArray);

    return ringFightWinner;
  }
}
