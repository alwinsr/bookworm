import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { BooksService } from "./books.service";
import { AddBookDto } from "./dto/add-book.dto";
import { SearchBooksDto } from "./dto/search-books.dto";

@ApiTags("books")
@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get("search")
  @ApiQuery({ name: "q", required: true, type: String })
  searchBooks(@Query() searchDto: SearchBooksDto) {
    return this.booksService.search(searchDto.q);
  }

  @Post()
  addBook(@Body() addBookDto: AddBookDto) {
    return this.booksService.addBook(addBookDto);
  }
}
