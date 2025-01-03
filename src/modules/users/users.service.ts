import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(query: FindOptionsWhere<User>): Promise<User | null> {
    return this.usersRepository.findOneBy(query);
  }

  async create(data: CreateUserDto): Promise<void> {
    const hashedPass = await hash(data.password, 10);
    const user = this.usersRepository.create({
      ...data,
      password: hashedPass,
    });

    await this.usersRepository.save(user);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    const updatedUser = Object.assign(user, data);
    return this.usersRepository.save(updatedUser);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOne({ id });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    await this.usersRepository.delete(id);
  }
}
