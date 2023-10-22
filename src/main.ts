import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config/config';
import { AppModule } from './infrastructure/adapters/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  const swagger = new DocumentBuilder()
    .setTitle('Cadastro de Clientes')
    .setDescription('API para cadastro de clientes')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, swagger);

  SwaggerModule.setup('docs', app, document);

  await app.listen(config.port);
}
bootstrap();
