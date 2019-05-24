import { ValidationPipe } from '@nestjs/common';

export function connectValidator(app):void {
  app.useGlobalPipes(new ValidationPipe());
}