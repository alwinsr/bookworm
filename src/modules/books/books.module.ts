import { Module } from "@nestjs/common";
import { BooksService } from "./books.service";
import { BooksController } from "./books.controller";
import { ConfigModule } from "@nestjs/config";
import { HttpModule } from "@nestjs/axios";
import { BooksRepository } from "./books.repository";
import { PrismaService } from "prisma/prisma.service";

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [BooksController],
  providers: [BooksService, PrismaService, BooksRepository],
})
export class BooksModule {}
