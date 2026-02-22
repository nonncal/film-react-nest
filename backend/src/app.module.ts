import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';
import { AppConfigModule } from './config/config.module';
import { AppConfig, configProvider } from './app.config.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { getTypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      cache: true,
    }),
    AppConfigModule,
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: AppConfig) => getTypeOrmConfig(config),
      inject: ['CONFIG'],
    }),
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
