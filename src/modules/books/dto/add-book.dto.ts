import { IsString, IsOptional, IsArray, IsDateString } from "class-validator";

export class AddBookDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsDateString()
  publishedAt: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsString()
  authorName: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];
}
