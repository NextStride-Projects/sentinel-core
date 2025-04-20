import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { logger } from './logger.starter';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let details: string | undefined;

    switch (exception.code) {
      case 'P2000':
        status = HttpStatus.BAD_REQUEST;
        message = 'Input too long for one of the fields.';
        break;

      case 'P2002': {
        status = HttpStatus.CONFLICT;
        const target = exception.meta?.target;
        message =
          typeof target === 'string'
            ? `Unique constraint failed on field: ${target}`
            : Array.isArray(target)
              ? `Unique constraint failed on fields: ${target.join(', ')}`
              : 'Unique constraint failed on unknown field';
        break;
      }

      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid reference (foreign key constraint).';
        break;

      case 'P2004':
        status = HttpStatus.BAD_REQUEST;
        message = 'Constraint violation.';
        break;

      case 'P2005':
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid value for one of the fields.';
        break;

      case 'P2006':
        status = HttpStatus.BAD_REQUEST;
        message = 'Missing required value for a field.';
        break;

      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found.';
        break;

      case 'P2010':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Raw query failed. Check query syntax or parameters.';
        break;

      case 'P2011':
        status = HttpStatus.BAD_REQUEST;
        message = 'Non-nullable field was left null.';
        break;

      case 'P2014':
        status = HttpStatus.BAD_REQUEST;
        message = 'Relation constraint violation.';
        break;

      case 'P2015':
        status = HttpStatus.NOT_FOUND;
        message = 'Cannot delete record — it does not exist.';
        break;

      default:
        message = `Unhandled Prisma error: ${exception.code}`;
        details = exception.message;
    }

    logger.error(`[PRISMA ERROR] ${message}`, {
      code: exception.code,
      path: exception.meta?.target,
      requestUrl: request?.url,
      method: request?.method,
      status,
      details,
    });

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.name,
    });
  }
}
