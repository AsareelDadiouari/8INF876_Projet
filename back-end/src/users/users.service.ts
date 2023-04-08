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

  private users: User[] = [];

  insertUser(login: string, password: string) {
    const newUser = new User(login, password, 'user');
    this.userRepository.save(newUser);
    return newUser;
  }

  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  getUser(id: string) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  updateUser2(id: string, login: string, password: string) {
    const [targetUser, index] = this.getUserById(id);
    const nup = { ...targetUser, login, password };
    const newUser = new User(nup.login, nup.password, nup.role);
    this.users[index] = newUser;
    return newUser;
  }

  async updateUser(id: string, login: string, password: string) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    user.login = login;
    user.password = password;
    await this.userRepository.update(id, user);
    return user;
  }

  async deleteUser(id: string) {
    await this.userRepository.delete(id);
  }

  private getUserById(id: string): [User, number] {
    const index = this.users.findIndex((u) => u.id == id);
    return [this.users[index], index];
  }
}
