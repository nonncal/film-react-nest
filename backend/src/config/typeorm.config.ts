// src/config/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfig } from 'src/app.config.provider';

export const getTypeOrmConfig = (config: AppConfig): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
});
