import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { Prisma } from "@prisma/client";
import { AddBookDto } from "./dto/add-book.dto";

@Injectable()
export class BooksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByTitle(title: string) {
    return this.prisma.book.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
      include: {
        author: true,
        genres: { include: { genre: true } },
      },
    });
  }

  private async findOrCreateAuthor(name: string) {
    let author = await this.prisma.author.findFirst({
      where: { name },
    });
    if (!author) {
      author = await this.prisma.author.create({
        data: { name },
      });
    }
    return author;
  }

  private async findOrCreateGenres(genreNames: string[]) {
    const genres = await Promise.all(
      genreNames.map(async (genreName) => {
        let genre = await this.prisma.genre.findUnique({
          where: { genre: genreName },
        });
        if (!genre) {
          genre = await this.prisma.genre.create({
            data: { genre: genreName },
          });
        }
        return genre;
      }),
    );
    return genres;
  }

  async addBook(dto: AddBookDto) {
    const author = await this.findOrCreateAuthor(dto.authorName);
    const genres = dto.genres ? await this.findOrCreateGenres(dto.genres) : [];

    const bookData: Prisma.BookCreateInput = {
      title: dto.title,
      description: dto.description,
      publisher: dto.publisher,
      publishedAt: new Date(dto.publishedAt),
      coverImageUrl: dto.thumbnail,
      author: {
        connect: { id: author.id },
      },
      genres: {
        create: genres.map((genre) => ({
          genre: {
            connect: { id: genre.id },
          },
        })),
      },
    };

    return this.prisma.book.create({
      data: bookData,
      include: {
        author: true,
        genres: { include: { genre: true } },
      },
    });
  }
}
