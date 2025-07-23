import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imagen } from './entities/imagen.entity';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ImagenesService {
  constructor(
    @InjectRepository(Imagen)
    private readonly imagenRepository: Repository<Imagen>,
  ) {}

  /**
   * Crea una nueva imagen con los datos del DTO y el archivo subido.
   * Valida que el archivo esté presente antes de guardar.
   */
  async create(
    createImagenDto: CreateImagenDto,
    file: Express.Multer.File,
  ): Promise<Imagen> {
    if (!file) {
      throw new BadRequestException('Debe subir un archivo de imagen');
    }

    const nuevaImagen = this.imagenRepository.create({
      ...createImagenDto,
      url: file.filename,
    });

    try {
      return await this.imagenRepository.save(nuevaImagen);
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar la imagen');
    }
  }

  /**
   * Devuelve todas las imágenes ordenadas por fecha de creación descendente.
   */
  async findAll(): Promise<Imagen[]> {
    return await this.imagenRepository.find({
      order: { creadoEn: 'DESC' },
    });
  }

  /**
   * Devuelve una imagen específica por su ID.
   * Lanza error si no existe.
   */
  async findOne(id: number): Promise<Imagen> {
    const imagen = await this.imagenRepository.findOneBy({ id });
    if (!imagen) {
      throw new NotFoundException(`Imagen con ID ${id} no encontrada`);
    }
    return imagen;
  }

  /**
   * Actualiza los datos de una imagen.
   * Si se sube un nuevo archivo, se reemplaza el archivo anterior.
   */
  async update(
    id: number,
    updateDto: CreateImagenDto,
    file?: Express.Multer.File,
  ): Promise<Imagen> {
    const imagen = await this.findOne(id);

    // Eliminar el archivo anterior si se sube uno nuevo
    if (file && imagen.url) {
      const oldPath = join(__dirname, '..', '..', 'uploads', imagen.url);
      try {
        await unlink(oldPath);
      } catch (err) {
        console.warn(`⚠️ No se pudo eliminar el archivo anterior: ${oldPath}`);
      }
      imagen.url = file.filename;
    }

    imagen.titulo = updateDto.titulo;
    imagen.descripcion = updateDto.descripcion;

    try {
      return await this.imagenRepository.save(imagen);
    } catch (error) {
      throw new InternalServerErrorException('Error al actualizar la imagen');
    }
  }

  /**
   * Elimina una imagen de la base de datos y del disco.
   */
  async remove(id: number): Promise<void> {
    const imagen = await this.findOne(id);

    // Eliminar archivo físico del disco
    if (imagen.url) {
      const pathToDelete = join(__dirname, '..', '..', 'uploads', imagen.url);
      try {
        await unlink(pathToDelete);
      } catch (err) {
        console.warn(`⚠️ No se pudo eliminar el archivo físico: ${pathToDelete}`);
      }
    }

    try {
      await this.imagenRepository.remove(imagen);
    } catch (error) {
      throw new InternalServerErrorException('Error al eliminar la imagen');
    }
  }
}
