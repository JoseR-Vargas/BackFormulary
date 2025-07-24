import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RecaptchaService } from './recaptcha.service';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(private readonly recaptchaService: RecaptchaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { recaptchaResponse } = request.body;

    if (!recaptchaResponse) {
      throw new HttpException(
        'reCAPTCHA response is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Get client IP for additional security
    const clientIp = request.ip || request.connection.remoteAddress;

    try {
      const isValid = await this.recaptchaService.verifyRecaptcha(
        recaptchaResponse,
        clientIp,
      );

      if (!isValid) {
        throw new HttpException(
          'reCAPTCHA verification failed',
          HttpStatus.BAD_REQUEST,
        );
      }

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'reCAPTCHA verification error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 