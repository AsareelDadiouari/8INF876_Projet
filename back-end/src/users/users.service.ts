import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  createUser(login: string, password: string) {
    const newUser = new User(login, password, 'user');
    this.userRepository.save(newUser);
    return newUser;
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUser(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async updateUser(id: string, login: string, password: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    user.login = login;
    user.password = password;
    await this.userRepository.update(id, user);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
