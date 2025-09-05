// dto/create-book.dto.ts
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsDateString()
  publishedAt: string; // ISO string

  @IsOptional()
  @IsString()
  coverImageUrl?: string;

  @IsOptional()
  genreIds?: number[]; // to link genres later
}
