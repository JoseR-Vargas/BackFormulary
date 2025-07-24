import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RecaptchaGuard, RequireRecaptcha } from './recaptcha';

@Controller('api/register')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(RecaptchaGuard)
  @RequireRecaptcha()
  async create(@Body() body: any) {
    // Remove recaptchaResponse from body before saving to database
    const { recaptchaResponse, ...userData } = body;
    
    const user = await this.userService.create(userData);
    console.log('Usuario guardado:', user);
    return user;
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
} 