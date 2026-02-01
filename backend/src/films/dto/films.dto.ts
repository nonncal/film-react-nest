import { IsArray, IsDateString, IsFQDN, IsInt, IsMongoId, IsNumber, IsString, Min } from "class-validator";

//TODO описать DTO для запросов к /films
export class ScheduleDto {
  @IsMongoId()
  id: string;
  @IsDateString()
  daytime: string;
  @IsInt()
  @Min(0)
  hall: number;
  @IsInt()
  @Min(0)
  rows: number;
  @IsInt()
  @Min(1)
  seats: number;
  @IsInt()
  @Min(0)
  price: number
  @IsArray()
  taken: string[];
}

export class FilmDto {
  @IsMongoId()
  id: string;
  @IsInt()
  @Min(0)
  rating: number;
  @IsArray()
  tags: string[];
  @IsString()
  director: string;
  @IsArray()
  schedules: ScheduleDto[];
  @IsFQDN()
  image: string;
  @IsFQDN()
  cover: string;
  @IsString()
  description: string;
  @IsString()
  title: string;
  @IsString()
  about: string;
}

export class FilmsResponse {
  @IsArray()
  items: FilmDto[];
  @IsNumber()
  total: number;
}

export class ScheduleResponse {
  @IsArray()
  items: ScheduleDto[];
  @IsNumber()
  total: number;
}