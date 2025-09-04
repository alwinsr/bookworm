import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findMany() {
    return this.prisma.book.findMany();
  }

  findByTitle(title: string) {
  }

  create(dto: CreateUserDto) {
  }
}
