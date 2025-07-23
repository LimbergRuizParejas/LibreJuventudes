import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Publicacion } from './entities/publicacion.entity';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';

@Injectable()
export class PublicacionesService {
  constructor(
    @InjectRepository(Publicacion)
    private readonly publicacionRepository: Repository<Publicacion>,
  ) {}

  /**
   * Crea una nueva publicación en la base de datos
   */
  async create(createDto: CreatePublicacionDto): Promise<Publicacion> {
    const nuevaPublicacion = this.publicacionRepository.create(createDto);
    return await this.publicacionRepository.save(nuevaPublicacion);
  }

  /**
   * Obtiene todas las publicaciones
   */
  async findAll(): Promise<Publicacion[]> {
    return await this.publicacionRepository.find({
      order: { id: 'DESC' },
    });
  }

  /**
   * Busca una publicación por su ID
   */
  async findOne(id: number): Promise<Publicacion> {
    const publicacion = await this.publicacionRepository.findOneBy({ id });
    if (!publicacion) {
      throw new NotFoundException(`Publicación con id ${id} no encontrada`);
    }
    return publicacion;
  }

  /**
   * Elimina una publicación por su ID
   */
  async remove(id: number): Promise<void> {
    const resultado = await this.publicacionRepository.delete(id);
    if (resultado.affected === 0) {
      throw new NotFoundException(`No se encontró la publicación con id ${id}`);
    }
  }
}
