import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectSwagger } from './configuration/connection.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await connectSwagger(app);

  await app.listen(3000);
}
bootstrap();
