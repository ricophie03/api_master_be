/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OutputInterceptor } from './core/output.interceptor';
import { OutputExceptionFilter } from './core/output.filter';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error'],
  });
  const port = process.env.PORT || 3000;

  // Swagger setup
  const options = new DocumentBuilder()
    .setTitle('CRUD Project')
    .setDescription('API Documentation for CRUD project')
    .setVersion(process.env.APP_VERSION)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalInterceptors(new OutputInterceptor());
  app.useGlobalFilters(new OutputExceptionFilter());
  app.enableCors({ origin: true, exposedHeaders: ['*'] });
  
  await app.listen(port);
  console.info('localhost:' + port);
}
bootstrap();