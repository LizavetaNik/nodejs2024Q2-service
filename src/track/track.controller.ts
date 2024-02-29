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
import { TrackService } from './track.servise';
import { ITrackDto, ITrack } from 'src/types/types';

@Controller('track')
export class TrackController {
  constructor(private readonly TrackServ: TrackService) {}

  @Get()
  getTracks() {
    return this.TrackServ.getTracks();
  }

  @Get(':id')
  getTrack(@Param('id') id: string) {
    return this.TrackServ.getTrack(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() trackDto: ITrackDto) {
    return this.TrackServ.createTrack(trackDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateTrack(@Param('id') id: string, @Body() updateTrackDto: ITrackDto) {
    return this.TrackServ.updateTrack(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrack(@Param('id') id: string) {
    return this.TrackServ.deleteTrack(id);
  }
}
