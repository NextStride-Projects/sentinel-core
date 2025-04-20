import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import { logger } from 'src/utils/logger.starter';

morgan.token('id', (req: Request): string => {
  const id = (req as { id?: unknown }).id;
  return typeof id === 'string' ? id : '-';
});

const format =
  process.env.NODE_ENV === 'production'
    ? ':id :remote-addr - :method :url :status :res[content-length] - :response-time ms'
    : 'dev';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  private morganMiddleware = morgan(format, {
    stream: {
      write: (message: string) => {
        logger.info(message.trim());
      },
    },
  });

  use(req: Request, res: Response, next: NextFunction): void {
    this.morganMiddleware(req, res, next);
  }
}
