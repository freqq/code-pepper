import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService {
  context?: string;

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @Inject(INQUIRER) source?: string | object,
  ) {
    this.context =
      typeof source === 'string' ? source : source?.constructor?.name;
  }

  log(message: string, context = this.context, ...params: string[]) {
    this.logger.log(message, context, ...params);
  }

  error(message: string, context = this.context, ...params: string[]) {
    this.logger.error(message, context, ...params);
  }

  warn(message: string, context = this.context, ...params: string[]) {
    this.logger.warn(message, context, ...params);
  }

  debug(message: string, context = this.context, ...params: string[]) {
    this.logger.debug(message, context, ...params);
  }
}
