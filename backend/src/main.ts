import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { TSKVLogger } from './loggers/tskv';
import { JsonLogger } from './loggers/json';
import { DevLogger } from './loggers/dev';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  switch (app.get('LOGGER')) {
    case 'tskv':
      app.useLogger(new TSKVLogger());
    case 'json':
      app.useLogger(new JsonLogger());
    case 'dev':
      app.useLogger(new DevLogger());
  }
  await app.listen(3000);
}
bootstrap();
