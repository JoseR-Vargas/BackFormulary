import { SetMetadata } from '@nestjs/common';

export const RECAPTCHA_KEY = 'recaptcha';
export const RequireRecaptcha = () => SetMetadata(RECAPTCHA_KEY, true); 