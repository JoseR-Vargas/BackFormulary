import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS específicamente para tu frontend
  app.enableCors({
    origin: [
      'https://frontformulary.netlify.app',
      'http://localhost:3000', // Para desarrollo local
      'http://localhost:5500', // Para Live Server
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  
  await app.listen(process.env.PORT || 3000);
  console.log('🚀 Backend corriendo en puerto:', process.env.PORT || 3000);
  console.log('🌐 CORS habilitado para:', 'https://frontformulary.netlify.app');
}
bootstrap();
