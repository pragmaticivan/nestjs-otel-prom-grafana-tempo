import Pino, { Logger, LoggerOptions } from 'pino';
import { trace, context } from '@opentelemetry/api';

export const loggerOptions: LoggerOptions = {
  level: 'info',
  formatters: {
    level(label) {
      return { level: label };
    },
    // Workaround for PinoInstrumentation (does not support latest version yet)
    log(object) {
      const span = trace.getSpan(context.active());
      if (!span) return { ...object };
      const { spanId, traceId } = trace
        .getSpan(context.active())
        ?.spanContext();
      return { ...object, spanId, traceId, span_id: spanId, trace_id: traceId };
    },
  },
};

export const logger: Logger = Pino(loggerOptions);
