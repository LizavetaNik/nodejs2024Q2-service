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
import { ICreateArtistDto, IUpdateArtistDto } from './artist-types';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private readonly ArtistServ: ArtistService) {}

  @Get()
  getArtists() {
    return this.ArtistServ.getArtists();
  }

  @Get(':id')
  getArtist(@Param('id') id: string) {
    return this.ArtistServ.getArtist(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() artistDto: ICreateArtistDto) {
    return this.ArtistServ.createArtist(artistDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateArtist(
    @Param('id') id: string,
    @Body() updateArtistDto: IUpdateArtistDto,
  ) {
    return this.ArtistServ.updateArtist(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtist(@Param('id') id: string) {
    return this.ArtistServ.deleteArtist(id);
  }
}
