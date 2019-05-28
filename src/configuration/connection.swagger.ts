import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function connectSwagger(app) {
  const swaggerSettings = new DocumentBuilder()
    .setTitle('Service Authentication')
    .setDescription(`Authentication service for Booking house.
                    \n Token JWT.
                    Strategy Google OAuth 2.0
                    Strategy Facebook OAuth 2.0,
                    Strategy Local Auth`)
    .setVersion('1.0.0')
    .setSchemes('http', 'https')
    .setHost('localhost:3000')
    .setBasePath('')
    .addBearerAuth('Authorization', 'header', 'apiKey')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerSettings);
  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
}
