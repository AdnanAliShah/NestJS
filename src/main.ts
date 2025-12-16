import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({ whitelist: true}));
  const config = app.get(ConfigService);
  const port = config.getOrThrow('PORT');
  await app.listen(port ?? 3000);
  console.log( `App is running on port ${port}`)
}
bootstrap();
