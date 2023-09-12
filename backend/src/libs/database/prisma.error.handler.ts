import { Prisma } from '@prisma/client';
import {
    BadRequestException,
    ConflictException,
    HttpException,
    Injectable
} from '@nestjs/common';

import { ErrorHandler, Exception } from '../exception';

@Injectable()
export class PrismaErrorHandler implements ErrorHandler {
    handle(error: unknown)  {
        if (error instanceof Prisma.PrismaClientInitializationError)
            throw new Exception(error.message, error.errorCode);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002')
                throw new ConflictException();
            if (error.code === 'P2003')
                throw new BadRequestException('Foreign key constraint failed');
            throw new Exception(error.message, error.code, undefined, error.meta);
        }
        if (error instanceof Prisma.PrismaClientRustPanicError)
            throw new Exception(error.message);

        if (error instanceof Prisma.PrismaClientUnknownRequestError)
            throw new Exception(error.message);

        if (error instanceof Prisma.PrismaClientValidationError)
            throw new Exception(error.message);

        throw new Exception('UNKNOWN DATABASE ERROR');
    };
};