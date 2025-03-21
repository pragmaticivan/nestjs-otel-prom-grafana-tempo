// logger.ts
import Pino, { Logger, LoggerOptions } from 'pino';
import { trace, context } from '@opentelemetry/api';

export const loggerOptions: LoggerOptions = {
  level: 'info',
  base: null, // removes pid/hostname by default
  formatters: {
    level(label) {
      return { level: label };
    },
    log(object) {
      const span = trace.getSpan(context.active());
      if (!span) return { ...object };
      const { spanId, traceId } = span.spanContext();
      return {
        ...object,
        trace_id: traceId,
        span_id: spanId,
      };
    },
  },
  timestamp: () => `,"time":"${new Date().toISOString()}"`,
};

export const logger: Logger = Pino(loggerOptions);
