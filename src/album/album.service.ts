import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { albumDb, artistsDb, trackDb } from 'src/database/database';
import { ICreateAlbumDto } from './album-types';
import { validate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  getAlbums() {
    return albumDb;
  }

  createAlbum(albumDto: ICreateAlbumDto) {
    this.validateAlbumCreate(albumDto);

    const validatedArtistId =
      albumDto.artistId && artistsDb.find((a) => a.id === albumDto.artistId)
        ? albumDto.artistId
        : null;

    const albumData = {
      id: uuidv4(),
      name: albumDto.name,
      year: albumDto.year,
      artistId: validatedArtistId,
    };
    albumDb.push(albumData);
    return albumData;
  }

  getAlbum(id: string) {
    return this.validateAlbumId(id);
  }

  updateAlbum(id: string, updateAlbumDto: ICreateAlbumDto) {
    this.validateAlbumId(id);
    this.validateAlbumCreate(updateAlbumDto);

    const index = albumDb.findIndex((album) => album.id === id);
    const album = albumDb[index];
    const validatedArtistId =
      updateAlbumDto.artistId &&
      artistsDb.find((a) => a.id === updateAlbumDto.artistId)
        ? updateAlbumDto.artistId
        : null;
    const newAlbumData = {
      id: album.id,
      name: updateAlbumDto.name || album.name,
      year: updateAlbumDto.year || album.year,
      artistId: validatedArtistId,
    };

    albumDb[index] = newAlbumData;
    return albumDb[index];
  }

  deleteAlbum(id: string) {
    this.validateAlbumId(id);
    const index = albumDb.findIndex((item) => item.id === id);
    trackDb.forEach((track) => {
      if (track.albumId === id) track.albumId = null;
    });
    albumDb.splice(index, 1);
    return null;
  }

  private validateAlbumId(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id is invalid (not uuid)'); // 400
    }

    const album = albumDb.find((item) => item.id === id);

    if (!album) {
      throw new NotFoundException('This album is not exist'); // 404
    }

    return album;
  }

  private validateAlbumCreate(albumDto: ICreateAlbumDto) {
    const { name, artistId, year } = albumDto;

    if (!albumDto || typeof name !== 'string' || typeof year !== 'number') {
      throw new BadRequestException('New album invalid'); //400
    }

    if (typeof artistId !== 'string' && artistId !== null) {
      throw new BadRequestException('Artist for new album invalid');
    }
  }
}
