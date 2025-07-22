import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evento } from './entities/evento.entity';
import { CreateEventoDto } from './dto/create-evento.dto';

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento)
    private readonly eventoRepository: Repository<Evento>,
  ) {}

  /**
   * Crea un nuevo evento a partir del DTO
   * Convierte la fecha (string ISO) a tipo Date antes de guardar
   */
  async create(createEventoDto: CreateEventoDto): Promise<Evento> {
    try {
      const evento = this.eventoRepository.create({
        ...createEventoDto,
        fecha: new Date(createEventoDto.fecha), // ✅ conversión correcta
      });

      return await this.eventoRepository.save(evento);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el evento');
    }
  }

  /**
   * Devuelve todos los eventos
   */
  async findAll(): Promise<Evento[]> {
    try {
      return await this.eventoRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener los eventos');
    }
  }

  /**
   * Devuelve un evento por su ID
   */
  async findOne(id: number): Promise<Evento> {
    const evento = await this.eventoRepository.findOne({ where: { id } });

    if (!evento) {
      throw new NotFoundException(`Evento con id ${id} no encontrado`);
    }

    return evento;
  }
}
