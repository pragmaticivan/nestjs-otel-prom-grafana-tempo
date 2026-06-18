import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OpenTelemetryModule, WideEventInterceptor } from 'nestjs-otel';
import { LoggerModule } from './logger/logger.module';
import { ActorModule } from './actor/actor.module';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: true,
  },
  wideEvents: {
    seed: (ctx) => ({
      'service.name': 'actor',
      'http.target': ctx.switchToHttp().getRequest().url,
    }),
  },
});

@Module({
  imports: [OpenTelemetryModuleConfig, LoggerModule, ActorModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: WideEventInterceptor,
    },
  ],
})
export class AppModule {}
