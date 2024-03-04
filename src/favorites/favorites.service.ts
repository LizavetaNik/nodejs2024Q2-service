import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { db } from 'src/database/database';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  getFavorites() {
    const tracks = [];
    const albums = [];
    const artists = [];

    db.favoritesDb.tracks.forEach((id) => {
      const track = db.trackDb.find((track) => track.id === id);
      if (track) {
        tracks.push(track);
      }
    });

    db.favoritesDb.albums.forEach((id) => {
      const album = db.albumDb.find((album) => album.id === id);
      if (album) {
        albums.push(album);
      }
    });

    db.favoritesDb.artists.forEach((id) => {
      const artist = db.artistsDb.find((artist) => artist.id === id);
      if (artist) {
        artists.push(artist);
      }
    });

    return {
      tracks,
      albums,
      artists,
    };
  }

  addAlbum(id: string) {
    this.validateId(id);
    const index = db.albumDb.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException();
    }
    db.favoritesDb.albums.push(id);
    return index;
  }

  addArtist(id: string) {
    this.validateId(id);
    const index = db.artistsDb.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException();
    }
    db.favoritesDb.artists.push(id);
    return index;
  }

  addTrack(id: string) {
    this.validateId(id);
    const index = db.trackDb.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException();
    }
    db.favoritesDb.tracks.push(id);
    return index;
  }

  deleteTrack(id: string) {
    this.validateId(id);
    const index = db.favoritesDb.tracks.findIndex((e) => e === id);
    if (index === -1) {
      throw new NotFoundException('This track was not found in favorites');
    }
    db.favoritesDb.tracks = db.favoritesDb.tracks.filter(
      (track) => track !== id,
    );
    return 'This track deleted';
  }

  deleteAlbum(id: string) {
    this.validateId(id);
    const index = db.favoritesDb.albums.findIndex((e) => e === id);
    if (index === -1) {
      throw new NotFoundException('This album was not found in favorites');
    }
    db.favoritesDb.albums = db.favoritesDb.albums.filter(
      (album) => album !== id,
    );
    return;
  }

  deleteArtist(id: string) {
    this.validateId(id);
    const index = db.favoritesDb.artists.findIndex((e) => e === id);
    if (index === -1) {
      throw new NotFoundException('This track was not found in favorites');
    }
    db.favoritesDb.artists = db.favoritesDb.artists.filter(
      (artist) => artist !== id,
    );
    return;
  }

  private validateId(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id is invalid (not uuid)'); // 400
    }
    return;
  }
}
