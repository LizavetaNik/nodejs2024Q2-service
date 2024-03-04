import { BadRequestException, NotFoundException } from '@nestjs/common';
import { albumDb, artistsDb, trackDb } from 'src/database/database';
import { ICreateArtistDto, IUpdateArtistDto } from './artist-types';
import { validate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

export class ArtistService {
  getArtists() {
    return artistsDb;
  }

  createArtist(artistDto: ICreateArtistDto) {
    this.validateNameAndGrammy(artistDto);

    const artistData = {
      id: uuidv4(),
      name: artistDto.name,
      grammy: artistDto.grammy,
    };
    artistsDb.push(artistData);
    return artistData;
  }

  getArtist(id: string) {
    return this.validateArtistId(id);
  }

  updateArtist(id: string, updateArtistDto: IUpdateArtistDto) {
    this.validateArtistId(id);
    this.validateUpdateArtist(updateArtistDto);

    const index = artistsDb.findIndex((item) => item.id === id);
    const artist = artistsDb.find((artist) => artist.id === id);

    const newArtistData = {
      ...artist,
      name: updateArtistDto.name,
      grammy: updateArtistDto.grammy,
    };
    try {
      artistsDb[index] = newArtistData;
      return artistsDb[index];
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  deleteArtist(id: string) {
    this.validateArtistId(id);
    const index = artistsDb.findIndex((item) => item.id === id);
    if (index === -1) throw new NotFoundException('artist not found');

    albumDb.forEach((album) => {
      if (album.artistId === id) album.artistId = null;
    });
    trackDb.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });

    artistsDb.splice(index, 1);
    return 'The record is found and deleted';
  }

  private validateArtistId(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id is invalid (not uuid)'); // 400
    }

    const artist = artistsDb.find((item) => item.id === id);

    if (!artist) {
      throw new NotFoundException('This artist is not exist'); // 404
    }

    return artist;
  }

  private validateNameAndGrammy(createArtistDto: ICreateArtistDto) {
    const { name, grammy } = createArtistDto;

    if (!(name && grammy)) {
      throw new BadRequestException('Artist data is invalide'); //400
    }
  }

  private validateUpdateArtist(updateArtistDto: IUpdateArtistDto) {
    const { name, grammy } = updateArtistDto;

    if (
      (!name && !grammy) ||
      (name && typeof name !== 'string') ||
      (grammy && typeof grammy !== 'boolean')
    ) {
      throw new BadRequestException('Artist data is invalide');
    }
  }
}
