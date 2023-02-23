import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { CoreModule } from './core/core.module';
import { dbConfig } from 'src/database.datasource';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CoreModule,
    TypeOrmModule.forRoot(dbConfig),
    PokemonsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
