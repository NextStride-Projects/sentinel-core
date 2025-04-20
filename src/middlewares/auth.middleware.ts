import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { config } from 'src/config/environment.config';
import { decrypt } from 'src/utils/token.encryption';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.method === 'POST' && req.path === '/auth/login') {
      return next();
    }

    const incomingKey = req.headers['x-api-key'] as string | undefined;

    if (!incomingKey) {
      console.error('Missing API key');
      throw new UnauthorizedException('Missing API key');
    }

    if (incomingKey !== config.apiKey) {
      console.error('Invalid API key');
      throw new UnauthorizedException('Invalid API key');
    }

    next();
  }
}
