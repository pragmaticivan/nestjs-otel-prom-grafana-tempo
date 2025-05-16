import { Module } from '@nestjs/common';
import { OtelConfigService } from './opentelemetry.factory';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  providers: [OtelConfigService],
})
export class ConfigModule {}
