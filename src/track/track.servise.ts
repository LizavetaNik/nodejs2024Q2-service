import { BadRequestException, NotFoundException } from '@nestjs/common';
import { db } from 'src/database/database';
import { ITrackDto } from './track-types';
import { validate } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import { ITypeOperation } from 'src/types/types';

export class TrackService {
  getTracks() {
    return db.trackDb;
  }

  createTrack(trackDto: ITrackDto) {
    this.validateArtistAndAlbum(trackDto, ITypeOperation.create);

    const trackData = {
      id: uuidv4(),
      name: trackDto.name,
      duration: trackDto.duration,
      artistId: trackDto?.artistId || null,
      albumId: trackDto?.albumId || null,
    };
    db.trackDb.push(trackData);
    return trackData;
  }

  getTrack(id: string) {
    return this.validateTrackId(id);
  }

  updateTrack(id: string, updateTrackDto: ITrackDto) {
    this.validateTrackId(id);
    this.validateArtistAndAlbum(updateTrackDto, ITypeOperation.update);

    const index = db.trackDb.findIndex((item) => item.id === id);
    const updatedTrack = { ...db.trackDb[index], ...updateTrackDto };
    db.trackDb[index] = updatedTrack;

    return updatedTrack;
  }

  deleteTrack(id: string) {
    this.validateTrackId(id);
    const index = db.trackDb.findIndex((item) => item.id === id);
    db.trackDb.splice(index, 1);
    return 'The record is found and deleted';
  }

  private validateTrackId(id: string) {
    const track = db.trackDb.find((item) => item.id === id);

    if (!track) {
      throw new NotFoundException('This track is not exist'); // 404
    }

    return track;
  }

  private validateArtistAndAlbum(
    updateTrackDto: ITrackDto,
    typeOperation: ITypeOperation,
  ) {
    const { name, artistId, albumId, duration } = updateTrackDto;

    if (artistId && (typeof artistId !== 'string' || artistId.trim() === '')) {
      throw new BadRequestException('Artist ID must be a non-empty string'); //400
    }

    if (albumId && (typeof albumId !== 'string' || albumId.trim() === '')) {
      throw new BadRequestException('Album ID must be a non-empty string');
    }

    if (typeOperation === ITypeOperation.create) {
      if (typeof name !== 'string' || name.trim() === '') {
        throw new BadRequestException('Name must be a non-empty string');
      }

      if (typeof duration !== 'number' || isNaN(duration)) {
        throw new BadRequestException('Duration must be a number');
      }
    }

    if (typeOperation === ITypeOperation.update) {
      if (name && (typeof name !== 'string' || name.trim() === '')) {
        throw new BadRequestException('Name must be a non-empty string');
      }

      if (duration && (typeof duration !== 'number' || isNaN(duration))) {
        throw new BadRequestException('Duration must be a number');
      }
    }
  }
}
