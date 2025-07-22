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

  async create(createDto: CreatePublicacionDto): Promise<Publicacion> {
    const nuevaPublicacion = this.publicacionRepository.create(createDto);
    return await this.publicacionRepository.save(nuevaPublicacion);
  }

  async findAll(): Promise<Publicacion[]> {
    return await this.publicacionRepository.find();
  }

  async findOne(id: number): Promise<Publicacion> {
    const publicacion = await this.publicacionRepository.findOneBy({ id });
    if (!publicacion) {
      throw new NotFoundException(`Publicación con id ${id} no encontrada`);
    }
    return publicacion;
  }
}
