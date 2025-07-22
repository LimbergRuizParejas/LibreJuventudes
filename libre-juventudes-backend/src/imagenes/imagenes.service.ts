import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imagen } from './entities/imagen.entity';
import { CreateImagenDto } from './dto/create-imagen.dto';

@Injectable()
export class ImagenesService {
  constructor(
    @InjectRepository(Imagen)
    private readonly imagenRepository: Repository<Imagen>,
  ) {}

  async create(createImagenDto: CreateImagenDto): Promise<Imagen> {
    const nuevaImagen = this.imagenRepository.create(createImagenDto);
    return await this.imagenRepository.save(nuevaImagen);
  }

  async findAll(): Promise<Imagen[]> {
    return await this.imagenRepository.find();
  }

  async findOne(id: number): Promise<Imagen> {
    const imagen = await this.imagenRepository.findOneBy({ id });
    if (!imagen) {
      throw new NotFoundException(`Imagen con id ${id} no encontrada`);
    }
    return imagen;
  }
}
