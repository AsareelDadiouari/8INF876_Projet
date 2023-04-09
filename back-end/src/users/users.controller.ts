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

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  createUser(@Body('login') login: string, @Body('password') password: string) {
    const user = this.userService.createUser(login, password);
    return user;
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
