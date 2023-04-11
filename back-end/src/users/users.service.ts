import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encodePassword } from '../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(username: string, password: string, role: string) {
    const encodedPassword = encodePassword(password);
    const newUser = new User(username, encodedPassword, role);
    return await this.userRepository.save(newUser);
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUser(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username: username } });
  }

  async updateUser(id: string, username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    user.username = username;
    user.password = password;
    await this.userRepository.update(id, user);
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
