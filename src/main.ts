import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { connectConfig } from './configuration/connection.config';
import { connectSwagger } from './configuration/connection.swagger';
import { connectValidator } from './configuration/connection.validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await connectConfig();
  await connectSwagger(app);
  await connectValidator(app);

  await app.listen(process.env.PORT);
}

bootstrap();
