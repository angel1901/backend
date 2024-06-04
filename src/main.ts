import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // somewhere in your initialization file
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());

  const otherAllowedHeaders = ['Authorization', 'X-Requested-With'];

  app.enableCors({
    allowedHeaders: ['Content-Type', ...otherAllowedHeaders],
    origin: 'http://localhost:5173',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
