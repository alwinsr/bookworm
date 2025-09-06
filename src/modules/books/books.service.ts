import { Injectable } from "@nestjs/common";
import { BooksRepository } from "./books.repository";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { AddBookDto } from "./dto/add-book.dto";

@Injectable()
export class BooksService {
  private googleBooksApiKey: string;

  constructor(
    private readonly bookRepository: BooksRepository,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>("GOOGLE_BOOKS_API_KEY");
    if (!apiKey) {
      throw new Error(
        "GOOGLE_BOOKS_API_KEY is not defined in environment variables",
      );
    }
    this.googleBooksApiKey = apiKey;
  }

  async search(query: string) {
    const localBooks = await this.bookRepository.findManyByTitle(query);
    if (localBooks.length > 0) {
      const formattedBooks = localBooks.map((book) => ({
        ...book,
        genres: book.genres.map((bg) => bg.genre.genre),
      }));
      return { source: "database", data: formattedBooks };
    }

    const openLibraryUrl = `https://openlibrary.org/search.json?title=${encodeURIComponent(
      query,
    )}&limit=10`;
    const { data: openLibraryData } = await firstValueFrom(
      this.httpService.get(openLibraryUrl),
    );

    if (!openLibraryData.docs || openLibraryData.docs.length === 0) {
      return { source: "apis", data: [] };
    }

    const enrichedBooksPromises = openLibraryData.docs.map(async (book) => {
      const authorName = book.author_name ? book.author_name[0] : "Unknown";
      let googleBookData: any = null;
      let googleApiUrl = "";

      if (book.isbn && book.isbn.length > 0) {
        googleApiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.isbn[0]}&key=${this.googleBooksApiKey}`;
      } else {
        const titleQuery = `intitle:${encodeURIComponent(book.title)}`;
        const authorQuery = `inauthor:${encodeURIComponent(authorName)}`;
        googleApiUrl = `https://www.googleapis.com/books/v1/volumes?q=${titleQuery}+${authorQuery}&key=${this.googleBooksApiKey}`;
      }

      try {
        const { data } = await firstValueFrom(
          this.httpService.get(googleApiUrl),
        );
        if (data.items && data.items.length > 0) {
          googleBookData = data.items[0].volumeInfo;
        }
      } catch (error) {
        console.error(
          `Failed to fetch data from Google Books for "${book.title}"`,
          error.message,
        );
      }

      return {
        title: book.title,
        authorName: authorName,
        publishedAt: book.first_publish_year
          ? new Date(book.first_publish_year, 0, 1).toISOString()
          : new Date().toISOString(),
        thumbnail:
          googleBookData?.imageLinks?.thumbnail ||
          (book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : null),
        description: googleBookData?.description || "No description available.",
        genres: googleBookData?.categories || [],
      };
    });

    const enrichedBooks = await Promise.all(enrichedBooksPromises);
    return { source: "apis", data: enrichedBooks };
  }

  async addBook(dto: AddBookDto) {
    return this.bookRepository.addBook(dto);
  }
}
