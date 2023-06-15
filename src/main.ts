import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalInterceptors(new TimeoutInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
