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
    console.log('📝 Recibiendo datos del formulario:', {
      nombre: body.nombre,
      correo: body.correo,
      edad: body.edad,
      comida: body.comida,
      selfieLength: body.selfie ? body.selfie.length : 0,
      recaptchaResponse: body.recaptchaResponse ? 'present' : 'missing'
    });
    
    // Remove recaptchaResponse from body before saving to database
    const { recaptchaResponse, ...userData } = body;
    
    try {
      const user = await this.userService.create(userData);
      console.log('✅ Usuario guardado exitosamente:', user._id);
      return user;
    } catch (error) {
      console.error('❌ Error guardando usuario:', error);
      throw error;
    }
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }
} 