import { HttpException } from '@nestjs/common';

export interface SerializedException {
  message: string;
  code?: string;
  stack?: string;
  cause?: string;
  metadata?: unknown;
}

export interface ErrorHandler {
  handle(error: unknown): HttpException | void;
}

export class Exception extends Error {
  constructor(
    readonly message: string,
    readonly code?: string,
    readonly cause?: Error,
    readonly metadata?: unknown
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): SerializedException {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      cause: JSON.stringify(this.cause),
      metadata: this.metadata
    };
  }
}
