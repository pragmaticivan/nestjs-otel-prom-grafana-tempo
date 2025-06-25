import { Module } from '@nestjs/common';
import { OpenTelemetryModule } from 'nestjs-otel';
import { LoggerModule } from './logger/logger.module';
import { ActorModule } from './actor/actor.module';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
  },
});

@Module({
  imports: [OpenTelemetryModuleConfig, LoggerModule, ActorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
