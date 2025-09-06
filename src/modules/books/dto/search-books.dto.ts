import { IsString, IsNotEmpty } from "class-validator";

export class SearchBooksDto {
  @IsString()
  @IsNotEmpty()
  q: string;
}
