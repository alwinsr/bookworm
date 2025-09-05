import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book, Prisma } from '@prisma/client';  // 👈 auto-generated type
import { GenreDto } from './dto/genre.dto';

@Injectable()
export class BooksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOneBook(id: number){
    return this.prisma.book.findUnique({
        where:  {
            id,
        }
    })
  }

  async findAllBooks(){
    return this.prisma.book.findMany();
  }

    async addBook(data: CreateBookDto) {
    return this.prisma.book.create({
        data: {
        title: data.title,
        description: data.description,
        publisher: data.publisher,
        publishedAt: data.publishedAt ? new Date(data.publishedAt),
        coverImageUrl: data.coverImageUrl,
        ...(data.genreIds?.length
            ? {
                genres: {
                create: data.genreIds.map((id) => ({
                    genre: { connect: { id } },
                })),
                },
            }
            : {}),
        },
        include: {
        genres: { include: { genre: true } },
        },
    });
    }

  async addBookGenre(createGenreDto: Prisma.GenreCreateInput){
    return this.prisma.genre.create({
        data : createGenreDto
    })
  }

  


}
