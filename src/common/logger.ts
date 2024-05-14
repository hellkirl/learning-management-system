import { createLogger, format, transports } from 'winston';

interface LoggerConfig {
  level: string;
  format: any;
  transports: any[];
}

const timezoned = () => {
  return new Date().toLocaleString('ru', {
    timeZone: 'Europe/Moscow',
  });
};

const logger: LoggerConfig = {
  level: 'info',
  format: format.combine(
    format.timestamp({ format: timezoned }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
    }),
  ],
};

export default createLogger(logger);
