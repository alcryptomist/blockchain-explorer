import { Logger } from 'eazy-logger';
import { loggerLevel } from 'config/app.conf';

const logger = Logger(
  {
    level: loggerLevel,
    prefix: '{blue:[}{magenta:log}{blue:]}',
    useLevelPrefixes: true,
  }
);

export default logger;