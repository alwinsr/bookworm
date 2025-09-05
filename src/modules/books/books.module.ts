import { Module } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { GoogleBooksService } from "./google-books.service";
import { BooksRepository } from "./books.repository";
import { PrismaService } from "prisma/prisma.service";

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [BooksController],
  providers: [BooksService, GoogleBooksService, PrismaService, BooksRepository ],
})
export class BooksModule {}
