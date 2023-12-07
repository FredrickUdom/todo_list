import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const port = process.env.PROJECT_PORT;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  // app.use(cookieParser());
  app.setGlobalPrefix('api/v1')
  await app.listen(port, () => console.log(`server is running on port: ${port}`));
}
bootstrap();
