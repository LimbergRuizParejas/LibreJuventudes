import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🌐 Habilitar CORS (muy importante si consumes desde frontend local)
  app.enableCors({
    origin: 'http://localhost:5173', // ⚠️ cambia esto en producción
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true, // necesario si usas cookies o encabezados Authorization
  });

  // 📌 Prefijo global para todas las rutas
  app.setGlobalPrefix('api');

  // 🛡️ Validación y saneamiento global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/api`);
}
bootstrap();
