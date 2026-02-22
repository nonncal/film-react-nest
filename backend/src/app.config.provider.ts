// src/config/app.config.provider.ts
import { ConfigService } from '@nestjs/config';

export const configProvider = {
  provide: 'CONFIG',
  useFactory: (configService: ConfigService): AppConfig => ({
    database: {
      driver: configService.get<string>('DATABASE_DRIVER', 'postgres'),
      host: configService.get<string>('DATABASE_HOST', 'localhost'),
      port: configService.get<number>('DATABASE_PORT', 5432),
      username: configService.get<string>('DATABASE_USERNAME', 'cinema_user'),
      password: configService.get<string>('DATABASE_PASSWORD', 'cinema_pass'),
      database: configService.get<string>('DATABASE_NAME', 'cinema_db'),
    },
  }),
  inject: [ConfigService],
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
