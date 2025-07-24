import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

export interface RecaptchaVerifyResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
}

@Injectable()
export class RecaptchaService {
  private readonly secretKey = process.env.SECRET_KEY;
  private readonly verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';

  async verifyRecaptcha(token: string, remoteIp?: string): Promise<boolean> {
    if (!this.secretKey) {
      throw new HttpException(
        'reCAPTCHA secret key not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!token) {
      throw new HttpException(
        'reCAPTCHA token is required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const params = new URLSearchParams();
      params.append('secret', this.secretKey);
      params.append('response', token);
      
      if (remoteIp) {
        params.append('remoteip', remoteIp);
      }

      const response = await axios.post<RecaptchaVerifyResponse>(
        this.verifyUrl,
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { success, 'error-codes': errorCodes } = response.data;

      if (!success) {
        console.error('reCAPTCHA verification failed:', errorCodes);
        throw new HttpException(
          `reCAPTCHA verification failed: ${errorCodes?.join(', ')}`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return success;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.error('Error verifying reCAPTCHA:', error);
      throw new HttpException(
        'Error verifying reCAPTCHA',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
} 