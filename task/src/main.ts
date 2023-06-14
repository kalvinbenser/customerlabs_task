import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DBService } from './db/db.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dbService: DBService = app.get(DBService);
  dbService.enableShutdownHooks(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4444);
}
bootstrap();
