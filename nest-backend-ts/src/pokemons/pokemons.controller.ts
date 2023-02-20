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
  // @Put(':id')
  // async updateById(@Param('id') id: number, @Body() updatePokemonDto: UpdatePokemonDto): Promise<string> {
  //   // TODO: Validate id

  //   // TODO: Update the entity

  //   return `OK ${id}`;
  // }
  // TODO: Consider @Patch(':id')

  @Get()
  async findAll(): Promise<Pokemon[]> {
    return this.pokemonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.pokemonsService.findById(id);
  }
}

@UseGuards(RolesGuard)
@Controller('calculate_damage')
export class DamageController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  @Roles('admin')
  async getDamage(@Query() query): Promise<number> {
    // TODO: Validate id1 to match pokemon id
    // TODO: Validate id2 to match pokemon id

    return this.pokemonsService.calculateDamage(query.attackerId, query.defenderId);
  }
}

@UseGuards(RolesGuard)
@Controller('ringfight')
export class RingFightController {
  constructor(private readonly pokemonsService: PokemonsService) {}

  @Get()
  async getRingFightResult(@Query() query): Promise<string> {
    // TODO: Validate ids to match pokemon id

    const ids = query.ids.split(',');

    let ringFightWinner;
    const pokemons = await Promise.all(ids.map(id => this.pokemonsService.findById(id)));

    pokemons.map((p) => ({ ...p, defeated: false}));

    // Be careful, that function changes order
    const pickRandomTwo = (list: Pokemon[]): Pokemon[] => {
      const shuffled = list.sort(() => 0.5 - Math.random());
      return [shuffled[0], shuffled[1]];
    }

    const simulateFight = (p1: Pokemon, p2: Pokemon) => { // TODO: Add return type
      return { winner: p1, loser: p2 };
    }

    // We pick a pokemon randomly each time
    // Alternatively we could use a binary tree
    for (let i = 0; i < pokemons.length**2; i++) { // Make sure the loop will finally end
      const winningPokemons = pokemons.filter((p) => p.defeated == true);
      if (winningPokemons.length == 1) {
        ringFightWinner = winningPokemons[0];
        break;
      }

      const [ pok1, pok2 ] = pickRandomTwo(pokemons.filter((p) => p.defeated == false));
      const { winner, loser } = simulateFight(pok1, pok2);
      // loser.defeated = true;
    }

    return ringFightWinner;
  }
}
