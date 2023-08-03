import { HttpStatus } from '@nestjs/common';
import { ExceptionBase } from './exception.base';
import { NOT_FOUND } from './exception.codes';

export class EpisodeNotFound extends ExceptionBase {
  constructor(id?: string, error?: Error) {
    const message = 'Episode with given id not found';
    super(message + id, error, HttpStatus.NOT_FOUND);
  }

  readonly code = NOT_FOUND;
}
