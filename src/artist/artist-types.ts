import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';

export type IArtist = {
  id: string;
  name: string;
  grammy: boolean;
};

export class ICreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

export class IUpdateArtistDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  @IsOptional()
  @IsNotEmpty()
  grammy: boolean;
}
