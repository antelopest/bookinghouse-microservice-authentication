import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function connectSwagger(app):void {
  const swaggerSettings = new DocumentBuilder()
    .setTitle('Service Authentication')
    .setDescription('Authentication service for Booking house. Token JWT. Strategy Google, Facebook, Local.')
    .setVersion('1.0.0')
    .addTag('auth')
    .setSchemes('http', 'https')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerSettings);
  SwaggerModule.setup('api/docs', app, swaggerDocument);
}