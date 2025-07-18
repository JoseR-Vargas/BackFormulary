import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/unified')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: any) {
    const user = await this.userService.create(body);
    console.log('Usuario guardado:', user);
    return user;
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
} 