import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

// export type User = any;

@Injectable()
export class UsersService {
  // private readonly users: User[];

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findByUsername(username: string): Promise<User | undefined> {
    // TODO: Rewrite to database
    const users = [
      {
        id: 1,
        username: 'john',
        password: 'changeme',
        firstName: 'john',
        lastName: 'smith',
        isActive: true,
      },
      {
        id: 2,
        username: 'chris',
        password: 'secret',
        firstName: 'john',
        lastName: 'smith',
        isActive: true,
      },
      {
        id: 3,
        username: 'maria',
        password: 'guess',
        firstName: 'john',
        lastName: 'smith',
        isActive: true,
      },
    ];
    return users.find((user) => user.username === username);
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
