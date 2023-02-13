import { Injectable } from "@nestjs/common";
import { Poke } from "../poke.entity";
import { Seeder, DataFactory } from "nestjs-seeder";

@Injectable()
export class UsersSeeder extends Seeder {
//   constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  async seed() {
    // Generate 10 users.
    const users = DataFactory.createForClass(Poke).generate(10);

    // Insert into the database.
    return this.user.insertMany(users);
  }

  async drop() {
    return this.user.deleteMany({});
  }
}
