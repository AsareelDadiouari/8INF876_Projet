import {Injectable, Logger} from '@nestjs/common';
import { User } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

 async createUser(login: string, password: string, role: string) {
    const newUser = new User(login, password, role);
    return await this.userRepository.save(newUser);
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
