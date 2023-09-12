import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  Logger,
  NestInterceptor
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Exception } from '@/libs/exception';

export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(ExceptionInterceptor.name);

  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<Exception> {
    return next.handle().pipe(
      catchError((err) => {
        if (err.status >= 400 && err.status < 500) {
          this.logger.debug(err.message);

          const isClassValidatorError =
            Array.isArray(err?.response?.message) &&
            typeof err?.response?.error === 'string' &&
            err.status === 400;

          if (isClassValidatorError) {
            err = new BadRequestException(
              new BadRequestException({
                statusCode: err.status,
                message: 'Validation error',
                error: err?.response?.error,
                subErrors: err?.response?.message
              })
            );
          }
        }

        if (err.code === 'auth/email-already-exists') {
          err = new ConflictException('Email address is already in use');
        }

        return throwError(() => err);
      })
    );
  }
}
