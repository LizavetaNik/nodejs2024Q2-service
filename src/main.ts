import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as yaml from 'js-yaml';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { HttpExceptionFilter } from './log/logger.exception.filter';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalFilters(new HttpExceptionFilter());

  const fileAPI = fs.readFileSync(
    path.join(__dirname, '../doc/api.yaml'),
    'utf8',
  );
  const docfileAPI = yaml.load(fileAPI);

  SwaggerModule.setup('doc', app, docfileAPI as OpenAPIObject);
  await app.listen(PORT);
}
bootstrap();
