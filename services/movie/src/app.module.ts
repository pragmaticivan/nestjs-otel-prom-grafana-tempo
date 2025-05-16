import { Module } from '@nestjs/common';
import { OpenTelemetryModule } from 'nestjs-otel';
import { LoggerModule } from './logger/logger.module';
import { MovieModule } from './movie/movie.module';
import { OtelConfigService } from './config/opentelemetry.factory';
import { ConfigModule } from './config/config.module';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRootAsync({
  useClass: OtelConfigService,
});

@Module({
  imports: [ConfigModule, OpenTelemetryModuleConfig, LoggerModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
