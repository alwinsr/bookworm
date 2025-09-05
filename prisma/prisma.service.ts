import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
  onModuleInit() {
    this.$connect()
      .then(() => console.log('Connected to db.'))
      .catch((err) => {
        console.log('Error connecting to db',err)
      });
  }


  onModuleDestroy() {
    this.$disconnect();
  }

}
