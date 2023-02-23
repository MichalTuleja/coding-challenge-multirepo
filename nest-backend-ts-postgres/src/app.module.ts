import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CoreModule,
    PokemonsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'nest-backend',
      autoLoadEntities: true,
      synchronize: false,
      // migrations: ['dist/migrations/1676332995841-seed-poke.js'],
      migrations: ['dist/migrations/*{.ts,.js}'],
      // migrationsTableName: "migrations",
      migrationsRun: false,
    //   "cli": {
    //     "entitiesDir": "src/entity",
    //     "migrationsDir": "src/migration",
    //     "subscribersDir": "src/subscriber"
    // }
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
