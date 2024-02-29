import { BadRequestException } from '@nestjs/common';
import { users } from 'src/database/users';
import { ICreateUserDto } from 'src/types/types';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  getUsers() {
    return users;
  }

  createUser(userDto: ICreateUserDto) {
    if (!(userDto.login && userDto.password)) {
      throw new BadRequestException('Invalid data');
    }

    const newUser = {
      id: uuidv4(),
      login: userDto.login,
      password: userDto.password,
      version: 1,
      createdAt: Number(Date.now()),
      updatedAt: Number(Date.now()),
    };
    users.push(newUser);

    const { ...rest } = newUser;
    delete rest.password;
    return rest;
  }
}
