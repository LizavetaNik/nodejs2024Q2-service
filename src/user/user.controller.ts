import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ICreateUserDto, IUpdatePasswordDto } from 'src/types/types';

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

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.UserServ.getUser(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: IUpdatePasswordDto,
  ) {
    return this.UserServ.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.UserServ.deleteUser(id);
  }
}
