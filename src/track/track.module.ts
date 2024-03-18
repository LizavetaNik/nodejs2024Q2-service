import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.servise';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
