import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto, RefreshDto, SignUpDto } from './auth-type';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwt: JwtService,
  ) {}

  async register(signUpDto: SignUpDto) {
    const user = await this.databaseService.user.findFirst({
      where: { login: signUpDto.login },
    });
    if (user) {
      return user;
    }

    const crypt_salt = parseInt(process.env.CRYPT_SALT);
    const password = await bcrypt.hash(signUpDto.password, crypt_salt);
    const result = await this.databaseService.user.create({
      data: {
        login: signUpDto.login,
        password: password,
      },
    });
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.databaseService.user.findFirst({
      where: { login: loginDto.login },
    });
    if (!user) {
      throw new NotFoundException('This album is not exist'); // 404
    }
    const payload = {
      userId: user.id,
      login: loginDto.login,
    };
    return {
      userId: user.id,
      login: loginDto.login,
      accessToken: this.jwt.sign(payload),
      refreshToken: this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }

  async refresh(refreshDto: RefreshDto) {
    if (!refreshDto.refreshToken) {
      throw new NotFoundException('This album is not exist'); // 404
    }

    const refreshData = this.jwt.verify(refreshDto.refreshToken, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
    });
    const user = await this.databaseService.user.findUnique({
      where: { id: refreshData.userId },
    });

    if (!user) {
      throw new NotFoundException('This album is not exist'); // 404
    }
    const payload = {
      userId: user.id,
      login: user.login,
    };
    return {
      userId: user.id,
      login: user.login,
      accessToken: this.jwt.sign(payload),
      refreshToken: this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }
}
