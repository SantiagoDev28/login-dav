import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './infrastructure/filters/global-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Filtro de excepciones global
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();