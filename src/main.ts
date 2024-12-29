import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  VERSION_NEUTRAL,
  VersioningType,
} from '@nestjs/common';
import { QueryErrorFilter } from './common/filters/query-error.filter';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'node:fs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new QueryErrorFilter());
  app.use(cookieParser());

  app.enableCors({
    origin: configService.get<string>('CLIENT_ORIGIN'),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  const config = new DocumentBuilder()
    .setTitle('Videochat')
    .setDescription('The video API description')
    .setVersion('1.0')
    .addBearerAuth({
      bearerFormat: 'JWT',
      type: 'http',
      scheme: 'bearer',
      'x-tokenName': 'Authorization',
    })
    .addServer('http://localhost:3000', 'Local Dev')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  fs.writeFileSync(
    './swagger.json',
    JSON.stringify(documentFactory(), null, 2),
  );
  SwaggerModule.setup('api', app, documentFactory);

  const port = configService.get<number>('PORT') || 3000;
  const listen_addr = configService.get<string>('LISTEN_ADDR') || '::';
  await app.listen(port, listen_addr);
}

bootstrap();
