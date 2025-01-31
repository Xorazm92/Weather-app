import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Weather API')
  .setDescription('Weather application API documentation')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'Bearer',
    in: 'Header',
  })
  .build();
