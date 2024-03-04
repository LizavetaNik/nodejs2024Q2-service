import { IsString, IsNotEmpty, IsInt, IsUUID } from 'class-validator';

export interface IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class ICreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  year: number;
  @IsString()
  @IsNotEmpty()
  @IsUUID('4')
  artistId: string | null;
}
