import { Module } from '@nestjs/common';
import {ServeStaticModule} from "@nestjs/serve-static";
import {ConfigModule} from "@nestjs/config";
import * as path from "node:path";
import {AppConfigModule} from "./config/config.module";
import {configProvider} from "./app.config.provider";
import { MongooseModule } from '@nestjs/mongoose';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
	    ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
          cache: true
      }),
      AppConfigModule,
      // @todo: Добавьте раздачу статических файлов из public
      ServeStaticModule.forRoot({
          rootPath: path.join(__dirname, '..', 'content', 'afisha'),
          serveRoot: '/content/afisha',
      }),
      MongooseModule.forRootAsync({
          useFactory: (config) => ({
              uri: config.database.url,
          }),
          inject: ['CONFIG'],
      }),
      FilmsModule,
      OrderModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}