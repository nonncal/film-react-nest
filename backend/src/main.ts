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
  const config = app.get('CONFIG');

  switch (config.logger) {
    case 'tskv':
      app.useLogger(new TSKVLogger());
      break;
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'dev':
      app.useLogger(new DevLogger());
      break;
  }
  await app.listen(3000);
}
bootstrap();
