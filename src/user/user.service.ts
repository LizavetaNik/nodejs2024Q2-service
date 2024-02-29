import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { usersDb } from 'src/database/database';
import { ICreateUserDto, IUpdatePasswordDto } from 'src/types/types';
import { v4 as uuidv4 } from 'uuid';
import { validate } from 'uuid';

export class UserService {
  getUsers() {
    return usersDb;
  }

  createUser(userDto: ICreateUserDto) {
    if (!(userDto.login && userDto.password)) {
      throw new BadRequestException('Invalid data'); // 400
    }

    const newUser = {
      id: uuidv4(),
      login: userDto.login,
      password: userDto.password,
      version: 1,
      createdAt: Number(Date.now()),
      updatedAt: Number(Date.now()),
    };
    usersDb.push(newUser);

    const { ...rest } = newUser;
    delete rest.password;
    return rest;
  }

  getUser(id: string) {
    return this.validateUserId(id);
  }

  updateUser(id: string, updateUserDto: IUpdatePasswordDto) {
    if (
      !(updateUserDto.oldPassword && updateUserDto.newPassword) ||
      typeof updateUserDto.oldPassword !== 'string' ||
      typeof updateUserDto.newPassword !== 'string'
    ) {
      throw new BadRequestException('Invalid data'); // 400
    }

    const oldUser = this.validateUserId(id);
    if (updateUserDto.oldPassword !== oldUser.password) {
      throw new ForbiddenException('Old password is wrong'); // 403
    }

    const version = oldUser.version + 1;
    const newUser = {
      ...oldUser,
      password: updateUserDto.newPassword,
      version: version,
      updatedAt: Number(Date.now()),
    };

    const index = usersDb.findIndex((item) => item.id === id);
    usersDb[index] = newUser;

    delete newUser.password;
    return newUser;
  }

  deleteUser(id: string) {
    this.validateUserId(id);
    const index = usersDb.findIndex((item) => item.id === id);
    usersDb.splice(index, 1);
    return 'The record is found and deleted';
  }

  private validateUserId(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id is invalid (not uuid)'); // 400
    }

    const user = usersDb.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException('This user is not exist'); // 404
    }

    return user;
  }
}
