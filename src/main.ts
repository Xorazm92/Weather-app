import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import { corsConfig } from './config/cors.config';

async function runApp() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 3000;

    app.enableCors(corsConfig);
    
    app.setGlobalPrefix('api');
    
    app.useGlobalPipes(new ValidationPipe());
    
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api/docs', app, document);
    
    await app.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  } catch (error) {
    throw new BadRequestException(error.message);
  }
}
runApp();
