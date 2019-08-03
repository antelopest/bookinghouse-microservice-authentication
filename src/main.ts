import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { connectConfig } from './shared/configuration/connection.config';
import { connectSwagger } from './shared/configuration/connection.swagger';
import { connectValidator } from './shared/configuration/connection.validator';

// tslint:disable-next-line:no-var-requires
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await connectConfig();
  await connectSwagger(app);
  await connectValidator(app);

  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
}

bootstrap();
