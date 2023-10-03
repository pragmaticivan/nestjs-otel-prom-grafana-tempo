import { Module } from '@nestjs/common';
import { OpenTelemetryModule } from 'nestjs-otel';
import { LoggerModule } from './logger/logger.module';
import { MovieModule } from './movie/movie.module';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
    apiMetrics: {
      enable: true,
    },
  },
});

@Module({
  imports: [OpenTelemetryModuleConfig, LoggerModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
