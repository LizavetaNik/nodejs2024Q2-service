import { Module } from '@nestjs/common';
import { JwtGuard } from './jwtGuard';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard],
  exports: [JwtModule],
})
export class AuthModule {}
