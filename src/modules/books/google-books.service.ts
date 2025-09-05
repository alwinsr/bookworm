import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GoogleBooksService {
  private apiUrl: string;
  private apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiUrl = this.configService.get<string>("GOOGLE_BOOKS_API")!;
    this.apiKey = this.configService.get<string>("GOOGLE_BOOKS_API_KEY")!;
  }

  fetchBooksByGenre(genre: string) {
    console.log(genre)
    const url = `${this.apiUrl}?q=subject:${genre}&orderBy=relevance&maxResults=40&key=${this.apiKey}`;
    var book = firstValueFrom(this.httpService.get(url));
    return book;
  }
}
