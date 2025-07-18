import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS para desarrollo local
  app.enableCors({
    origin: [
      'http://localhost:5500',      // Live Server
      'http://127.0.0.1:5500',     // Live Server (alternativo)
      'http://localhost:3000',      // Desarrollo local
      'http://localhost:8000',      // Python server
      'https://frontformulary.netlify.app', // Producción
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  
  await app.listen(process.env.PORT || 3000);
  console.log('🚀 Backend corriendo en puerto:', process.env.PORT || 3000);
  console.log('🌐 CORS habilitado para desarrollo local y producción');
}
bootstrap();
