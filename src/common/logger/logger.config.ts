import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

const getLoggerConfig = () =>
  WinstonModule.forRoot({
    level: 'info',
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          utilities.format.nestLike('star-wars-manager'),
        ),
      }),
    ],
  });

export default getLoggerConfig;
