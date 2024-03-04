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
import { AlbumService } from './album.service';
import { ICreateAlbumDto } from './album-types';

@Controller('album')
export class AlbumController {
  constructor(private readonly AlbumServ: AlbumService) {}

  @Get()
  getAlbums() {
    return this.AlbumServ.getAlbums();
  }

  @Get(':id')
  getAlbum(@Param('id') id: string) {
    return this.AlbumServ.getAlbum(id);
  }

  @Post()
  @HttpCode(201)
  create(@Body() albumDto: ICreateAlbumDto) {
    return this.AlbumServ.createAlbum(albumDto);
  }

  @Put(':id')
  @HttpCode(200)
  updateAlbum(
    @Param('id') id: string,
    @Body() updateAlbumDto: ICreateAlbumDto,
  ) {
    return this.AlbumServ.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbum(@Param('id') id: string) {
    return this.AlbumServ.deleteAlbum(id);
  }
}
