import { Module } from '@nestjs/common';
import { PokeController } from './poke.controller';
import { PokeService } from './poke.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Poke } from './poke.entity';

const dbConfig = {
  type: 'sqlite',
  database: 'data.sqlite3.db',
  entities: [ Poke ],
  synchronize: true,
  dropSchema: true,
};

/*
 * For the purpose of this task I am going to keep database handling
 * within this module. For more extensive database usage
 * a separate module would be useful
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([Poke])
  ],
  exports: [
    TypeOrmModule,
    PokeService,
  ],
  controllers: [PokeController],
  providers: [PokeService],
})

// const dataSource = new DataSource(dbConfig);

// class UserSeeder extends Seeder {
//   async run(dataSource) {
//     // const users: User[] = [...]
//     // await dataSource.createEntityManager().save<User>(users)
//   }
// }

// const seedDb = () => {
//   const userSeeder = new UserSeeder();
// };

export class PokeModule { }
// export class PokeService {}

