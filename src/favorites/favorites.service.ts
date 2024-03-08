import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { IAlbum } from 'src/album/type/album-types';
import { IArtist } from 'src/artist/type/artist-types';
import { db } from 'src/database/database';
import { DatabaseService } from 'src/database/database.service';
import { ITrack } from 'src/track/type/track-types';

@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getFavorites() {
    const tracks = await this.databaseService.track.findMany({
      where: { isFavorite: true },
    });
    const albums = await this.databaseService.album.findMany({
      where: { isFavorite: true },
    });
    const artists = await this.databaseService.artist.findMany({
      where: { isFavorite: true },
    });
    return {
      tracks: this.resultFav(tracks),
      albums: this.resultFav(albums),
      artists: this.resultFav(artists),
    };
  }

  resultFav(array: IAlbum[] | ITrack[] | IArtist[]) {
    const excludeField = (object: Record<string, any>, keys: string[]) => {
      return Object.fromEntries(
        Object.entries(object).filter(([key]) => !keys.includes(key)),
      );
    };

    return array.map((item) => excludeField(item, ['isFavorite']));
  }

  async addAlbum(id: string) {
    try {
      const album = await this.databaseService.album.update({
        where: { id },
        data: { isFavorite: true },
      });
      return album;
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async addArtist(id: string) {
    try {
      const artist = await this.databaseService.artist.update({
        where: { id },
        data: { isFavorite: true },
      });
      return artist;
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async addTrack(id: string) {
    try {
      const track = await this.databaseService.track.update({
        where: { id },
        data: { isFavorite: true },
      });
      return track;
    } catch (error) {
      throw new UnprocessableEntityException();
    }
  }

  async deleteTrack(id: string) {
    const track = await this.databaseService.track.update({
      where: { id },
      data: { isFavorite: false },
    });
    if (!track) {
      throw new NotFoundException('This track was not found in favorites');
    }
    return;
  }

  async deleteAlbum(id: string) {
    const album = await this.databaseService.album.update({
      where: { id },
      data: { isFavorite: false },
    });
    if (!album) {
      throw new NotFoundException('This album was not found in favorites');
    }
    return;
  }

  async deleteArtist(id: string) {
    const artist = await this.databaseService.artist.update({
      where: { id },
      data: { isFavorite: false },
    });
    if (!artist) {
      throw new NotFoundException('This track was not found in favorites');
    }
    return;
  }
}
