import { BooksService } from "./books.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { GoogleBooksService } from "./google-books.service";
import { Controller, Post, Body, Get, Param, Patch, Delete, Query } from "@nestjs/common";
import { GenreDto } from "./dto/genre.dto";
import { Prisma } from "@prisma/client";

@ApiTags("books")
@Controller("books")
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly googleBooksService: GoogleBooksService
  ) { }

  @Post()
  addBook(@Body() createBookDto: CreateBookDto){
    return this.booksService.createBook(createBookDto);
  }

  @Get("all")
  findAll() {
    return this.booksService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.booksService.findOne(id);
  }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.booksService.update(+id, updateBookDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.booksService.remove(+id);
  // }

  // @Get("import")
  // @ApiQuery({ name: 'genre', required: true, type: String })
  // importBooks(@Query("genre") genre: string) {
  //   console.log("[DEBUG] importBooks hit with genre:", genre);
  //   return this.googleBooksService.fetchBooksByGenre(genre);
  // }

  //genre
  @Post()
  addGenre(@Body() genreDto: GenreDto) {
    return this.booksService.addGenre(genreDto);
  }

  
}
