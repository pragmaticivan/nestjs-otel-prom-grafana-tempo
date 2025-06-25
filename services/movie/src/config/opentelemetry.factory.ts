import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OpenTelemetryOptionsFactory, OpenTelemetryModuleOptions } from 'nestjs-otel';

@Injectable()
export class OtelConfigService implements OpenTelemetryOptionsFactory {

  constructor(private readonly configService: ConfigService) {}

  createOpenTelemetryOptions(): Promise<OpenTelemetryModuleOptions> | OpenTelemetryModuleOptions {
    // Just an empty example for usage with Config Service with forRootAsync.
    const { hostMetrics = {}, apiMetrics = {} } = this.configService.get('otel') ?? {};

    return {
      metrics: {
        hostMetrics: hostMetrics.enabled ?? true,
      },
    };
  }
}
