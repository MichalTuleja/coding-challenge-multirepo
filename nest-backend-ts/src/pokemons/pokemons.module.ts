import { Module } from '@nestjs/common';
import { PokemonsController, DamageController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  controllers: [
    PokemonsController,
    DamageController,
  ],
  providers: [PokemonsService],
})
export class PokemonsModule {}
