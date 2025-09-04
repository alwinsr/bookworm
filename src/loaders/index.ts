import { INestApplication } from '@nestjs/common';
import { swaggerLoader } from './swagger.loader';

export async function initLoaders(app: INestApplication) {
  await swaggerLoader(app);
}
