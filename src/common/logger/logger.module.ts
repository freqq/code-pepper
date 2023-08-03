import { Global, Module } from '@nestjs/common';
import getLoggerConfig from './logger.config';
import { LoggerService } from './logger.service';

@Global()
@Module({
  imports: [getLoggerConfig()],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
