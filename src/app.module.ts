import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [PrismaModule, BooksModule]
})
export class AppModule {}
