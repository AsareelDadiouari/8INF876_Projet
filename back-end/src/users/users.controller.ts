import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { comparePassword } from '../utils/bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ) {
    return await this.userService.createUser(username, password, role);
  }

  @Post('login')
  async validateUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const userDB = await this.userService.findUserByUsername(username);
    if (userDB) {
      const matched = comparePassword(password, userDB.password);
      if (matched) {
        console.log('User validation Success ! ');
        return userDB;
      } else {
        console.log('Password do not match');
        return null;
      }
    }
  }

  @Get()
  getAllUsers() {
    return this.userService.getUsers();
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Put(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    return this.userService.updateUser(userId, login, password);
  }

  @Delete(':userId')
  deleteUser(@Param('userId') userId: string) {
    this.userService.deleteUser(userId);
  }
}
