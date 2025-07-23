import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from './entities/imagen.entity';
import { ImagenesService } from './imagenes.service';
import { ImagenesController } from './imagenes.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([Imagen]),

    // 📁 Configuración de subida de archivos con multer
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Carpeta donde se guardan los archivos
        filename: (_req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),

      // 🔒 Filtro de archivos válidos (solo imágenes)
      fileFilter: (_req, file, cb) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Tipo de archivo no permitido (solo JPG, PNG, WEBP)'), false);
        }
      },

      // 📏 Límite de tamaño de archivo: 5MB
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  ],
  controllers: [ImagenesController],
  providers: [ImagenesService],
})
export class ImagenesModule {}
