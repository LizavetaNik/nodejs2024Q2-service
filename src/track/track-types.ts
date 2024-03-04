import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class ITrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  artistId: string | null;
  @IsString()
  @IsNotEmpty()
  albumId: string | null;
  @IsInt()
  duration: number;
}
