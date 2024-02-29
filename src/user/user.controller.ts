import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ICreateUserDto } from 'src/types/types';

@Controller('user')
export class UserController {
  constructor(private readonly UserServ: UserService) {}

  @Get()
  getUsers() {
    return this.UserServ.getUsers();
  }

  @Post()
  @HttpCode(201)
  create(@Body() userDto: ICreateUserDto) {
    return this.UserServ.createUser(userDto);
  }
}
