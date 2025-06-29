import Pino, { Logger, LoggerOptions } from 'pino';

export const loggerOptions: LoggerOptions = {
  level: 'info',
  formatters: {
    level(label) {
      return { level: label };
    },
  },
};

export const logger: Logger = Pino(loggerOptions);
