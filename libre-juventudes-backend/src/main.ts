import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // Inicializa la aplicación como NestExpressApplication para permitir servir archivos estáticos
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 🌐 Habilita CORS para permitir peticiones del frontend (por ejemplo React en localhost:5173)
  app.enableCors({
    origin: 'http://localhost:5173', // ⚠️ Cambiar a tu dominio real en producción
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // 📁 Sirve archivos estáticos desde la carpeta "uploads"
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // Las imágenes serán accesibles en http://localhost:3000/uploads/<archivo>
  });

  // 🔗 Aplica un prefijo global a todas las rutas de tu API
  app.setGlobalPrefix('api');

  // 🛡️ Aplica validación global a todos los DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza error si se envían propiedades extras
      transform: true, // Convierte tipos automáticamente (ej. string a number)
    }),
  );

  // 🚀 Levanta el servidor
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/api`);
}

bootstrap();
