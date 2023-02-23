import { Module } from '@nestjs/common';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './pokemon.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    AuthModule,
  ],
  controllers: [
    PokemonsController,
  ],
  providers: [PokemonsService],
})
export class PokemonsModule {}
