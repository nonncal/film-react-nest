import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { configProvider } from 'src/app.config.provider';

@Global()
@Module({
  imports: [NestConfigModule.forRoot()],
  providers: [configProvider],
  exports: ['CONFIG'],
})
export class AppConfigModule {}
