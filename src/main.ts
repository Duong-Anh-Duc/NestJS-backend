import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from "./app.module";
import { JwtAuthGuard } from './auth/jwt-auth.guard';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService)
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(reflector))
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type : VersioningType.URI,
    defaultVersion : ['1', '2']
  })
  app.setViewEngine('ejs')
  app.useGlobalPipes(new ValidationPipe())
  //app.useGlobalInterceptors(new TransformInterceptor(reflector))
  app.enableCors({
    "origin" : "*",
    "methods" : "GET, HEAD, PUT, PATCH, POST, DELETE",
    "preflightContinue" : false,
  });
  await app.listen(process.env.PORT);
}
bootstrap();
