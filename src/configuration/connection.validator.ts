import { ValidationPipe } from '@nestjs/common';

export function connectValidator(app) {
  app.useGlobalPipes(new ValidationPipe());
}
