import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initLoaders } from './loaders';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await initLoaders(app);

  await app.listen(3000);
  console.log(`🚀 Application running on: ${await app.getUrl()}`);
}
bootstrap();
