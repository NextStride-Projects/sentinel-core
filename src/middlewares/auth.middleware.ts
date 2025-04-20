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

    const encryptedKey = req.headers['x-api-key'] as string | undefined;

    if (!encryptedKey) {
      throw new UnauthorizedException('Missing API key');
    }

    let decryptedKey: string;

    try {
      decryptedKey = decrypt(encryptedKey);
    } catch {
      throw new UnauthorizedException('Malformed or corrupted API key');
    }

    if (decryptedKey !== config.apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    next();
  }
}
