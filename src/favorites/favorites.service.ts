import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  albumDb,
  artistsDb,
  favoritesDb,
  trackDb,
} from 'src/database/database';
import { validate } from 'uuid';

@Injectable()
export class FavoritesService {
  getFavorites() {
    const tracks = [];
    const albums = [];
    const artists = [];

    favoritesDb.tracks.forEach((id) => {
      const track = trackDb.find((track) => track.id === id);
      if (track) {
        tracks.push(track);
      }
    });

    favoritesDb.albums.forEach((id) => {
      const album = albumDb.find((album) => album.id === id);
      if (album) {
        albums.push(album);
      }
    });

    favoritesDb.artists.forEach((id) => {
      const artist = artistsDb.find((artist) => artist.id === id);
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
    const index = albumDb.findIndex((album) => album.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException();
    }
    favoritesDb.albums.push(id);
    return index;
  }

  addArtist(id: string) {
    this.validateId(id);
    const index = artistsDb.findIndex((artist) => artist.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException();
    }
    favoritesDb.artists.push(id);
    return index;
  }

  addTrack(id: string) {
    this.validateId(id);
    const index = trackDb.findIndex((track) => track.id === id);
    if (index === -1) {
      throw new UnprocessableEntityException();
    }
    favoritesDb.tracks.push(id);
    return index;
  }

  deleteTrack(id: string) {
    this.validateId(id);
    const index = favoritesDb.tracks.findIndex((e) => e === id);
    if (index === -1) {
      throw new NotFoundException('This track was not found in favorites');
    }
    favoritesDb.tracks = favoritesDb.tracks.filter((track) => track !== id);
    return 'This track deleted';
  }

  deleteAlbum(id: string) {
    this.validateId(id);
    const index = favoritesDb.albums.findIndex((e) => e === id);
    if (index === -1) {
      throw new NotFoundException('This album was not found in favorites');
    }
    favoritesDb.albums = favoritesDb.albums.filter((album) => album !== id);
    return;
  }

  deleteArtist(id: string) {
    this.validateId(id);
    const index = favoritesDb.artists.findIndex((e) => e === id);
    if (index === -1) {
      throw new NotFoundException('This track was not found in favorites');
    }
    favoritesDb.artists = favoritesDb.artists.filter((artist) => artist !== id);
    return;
  }

  private validateId(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Id is invalid (not uuid)'); // 400
    }
    return;
  }
}
