import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from './jwtGuard';
import { LoginDto, RefreshDto, SignUpDto } from './auth-type';
import { AuthService } from './auth.service';

@UseGuards(JwtGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthServ: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  signup(@Body() signUpDto: SignUpDto) {
    return this.AuthServ.register(signUpDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    const payload = await this.AuthServ.login(loginDto);
    return payload;
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(@Body() refreshDto: RefreshDto) {
    return this.AuthServ.refresh(refreshDto);
  }
}
