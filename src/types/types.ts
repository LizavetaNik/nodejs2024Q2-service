import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export interface IUser {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class IUpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password
  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}

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

export enum ITypeOperation {
  create = 1,
  update = 2,
}
