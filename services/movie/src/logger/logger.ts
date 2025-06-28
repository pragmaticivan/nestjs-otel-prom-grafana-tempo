import Pino, { Logger, LoggerOptions } from 'pino';

export const loggerOptions: LoggerOptions = {
  level: 'info',
  formatters: {
    level(label) {
      return { level: label };
    },
    log(object) {
      return { ...object, 'service.name': process.env.OTEL_SERVICE_NAME || 'unknown-service' };
    },
  },
};

export const logger: Logger = Pino(loggerOptions);
