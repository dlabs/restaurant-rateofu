import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';

/**
 * Validates if the `Authorization` is passed in the header. Throws an HTTP exception with a 400 status code
 * if the header is not passed.
 */
@Injectable()
export class JwtMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    // Extract headers from the request object
    const { headers } = req;

    // Get the `Authorization` from header
    const token: string = headers['Authorization'] || headers['authorization'];

    if (!token) {
      throw new HttpException('`Token` not provided', HttpStatus.BAD_REQUEST);
    }

    // Invoke the next function in the stack (continue)
    next();
  }
}
