import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from "passport"
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const port = process.env.PROJECT_PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  app.enableCors({
    origin: 'http://localhost:3000'
  });

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie:{
        maxAge: 60000,
        secure: true,
        httpOnly: true
      }
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())


  app.use(cookieParser());
  app.setGlobalPrefix('api/v1')
  await app.listen(port, () => console.log(`server is running on port: ${port}`));
}
bootstrap();
