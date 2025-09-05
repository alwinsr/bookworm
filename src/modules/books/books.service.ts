import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GenreDto } from './dto/genre.dto';
import { BooksRepository } from './books.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class BooksService {

  constructor(private readonly bookRepo: BooksRepository) {}
  

  async createBook(dto: CreateBookDto) {
  return this.bookRepo.addBook(dto);
}

  findAll() {
    return this.bookRepo.findAllBooks();
  }

  findOne(id: number) {
    return this.bookRepo.findOneBook(id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }

  addGenre(genreDto: Prisma.GenreCreateInput) {
     return this.bookRepo.addBookGenre(genreDto);
  }
}
