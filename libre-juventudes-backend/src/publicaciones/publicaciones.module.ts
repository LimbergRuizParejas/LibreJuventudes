import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publicacion } from './entities/publicacion.entity';
import { PublicacionesService } from './publicaciones.service';
import { PublicacionesController } from './publicaciones.controller';

/**
 * Módulo Publicaciones que importa TypeORM con la entidad,
 * y registra el servicio y controlador para manejar las rutas /publicaciones
 */
@Module({
  imports: [TypeOrmModule.forFeature([Publicacion])],
  controllers: [PublicacionesController],
  providers: [PublicacionesService],
})
export class PublicacionesModule {}
