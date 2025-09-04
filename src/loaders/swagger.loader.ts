import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function swaggerLoader(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Bookworm API')
    .setDescription('API docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  console.log('✅ Swagger docs enabled');
}
