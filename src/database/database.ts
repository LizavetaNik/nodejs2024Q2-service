import { IAlbum } from 'src/album/album-types';
import { IArtist } from 'src/artist/artist-types';
import { IFavorites } from 'src/favorites/favorites-types';
import { ITrack } from 'src/track/track-types';
import { IUser } from 'src/user/user-types';

export const usersDb: IUser[] = [];
export const trackDb: ITrack[] = [];
export const albumDb: IAlbum[] = [];
export const artistsDb: IArtist[] = [];
export const favoritesDb: IFavorites = {
  albums: [],
  artists: [],
  tracks: [],
};
