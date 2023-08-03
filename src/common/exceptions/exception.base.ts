import { HttpException, HttpStatus } from '@nestjs/common';

export interface SerializedException {
  message: string;
  code: string;
  stack?: string;
  cause?: string;
  metadata?: unknown;
}

/**
 * Base class for custom exceptions.
 *
 * @abstract
 * @class ExceptionBase
 * @extends {HttpException}
 */
export abstract class ExceptionBase extends HttpException {
  abstract code: string;

  /**
   * @param {string} message
   * @param {ObjectLiteral} [metadata={}]
   */
  constructor(
    readonly message: string,
    readonly cause: Error,
    status = HttpStatus.BAD_REQUEST,
    readonly metadata?: unknown,
  ) {
    super(message, status);
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata,
    };
  }
}
