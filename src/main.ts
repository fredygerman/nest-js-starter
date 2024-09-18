import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import config from './config';

const { appUrl, port } = config;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const docConfig = new DocumentBuilder()
    .setTitle('NestJS  API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  Logger.log(`Server running on 👉 ${appUrl}`, 'Main');
  Logger.log(`Swagger running on 👉  ${appUrl}/docs`, 'Main');
  Logger.log('All Systems Go! 🚀', 'Main');
}
bootstrap();
