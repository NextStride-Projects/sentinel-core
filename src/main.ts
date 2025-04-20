import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Express } from 'express';
import { PrismaExceptionFilter } from './utils/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const expressApp = app.getHttpAdapter().getInstance() as Express;
  expressApp.set('trust proxy', 1);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new PrismaExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Server Monitoring API')
    .setDescription('Central service for tracking server metrics and alerts')
    .setVersion('1.0')
    .addTag('Servers')
    .addTag('Metrics')
    .addTag('Auth')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      },
      'api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(9080);
}

bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});
