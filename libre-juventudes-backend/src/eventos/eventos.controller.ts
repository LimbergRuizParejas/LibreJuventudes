import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EventosService } from './eventos.service'; // Asegúrate de que el servicio esté correctamente exportado e importado
import { CreateEventoDto } from './dto/create-evento.dto';
import { Evento } from './entities/evento.entity';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventosService: EventosService) {}

  /**
   * Crea un evento
   * @param createEventoDto Datos del nuevo evento
   * @returns Evento creado
   */
  @Post()
  async create(@Body() createEventoDto: CreateEventoDto): Promise<Evento> {
    try {
      return await this.eventosService.create(createEventoDto); // Llama al servicio para crear el evento
    } catch (error: unknown) {
      // Manejo seguro del error
      if (error instanceof Error) {
        throw new InternalServerErrorException(`Error al crear el evento: ${error.message}`);
      }
      throw new InternalServerErrorException('Error inesperado al crear el evento');
    }
  }

  /**
   * Obtiene todos los eventos
   * @returns Lista de eventos
   */
  @Get()
  async findAll(): Promise<Evento[]> {
    try {
      return await this.eventosService.findAll(); // Llama al servicio para obtener todos los eventos
    } catch (error: unknown) {
      // Manejo seguro del error
      if (error instanceof Error) {
        throw new InternalServerErrorException(`Error al obtener los eventos: ${error.message}`);
      }
      throw new InternalServerErrorException('Error inesperado al obtener los eventos');
    }
  }

  /**
   * Obtiene un evento por ID
   * @param id ID del evento
   * @returns Evento encontrado
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Evento> {
    try {
      const evento = await this.eventosService.findOne(+id); // Convierte el parámetro a número para obtener el evento
      if (!evento) {
        throw new NotFoundException(`Evento con ID ${id} no encontrado`);
      }
      return evento; // Retorna el evento encontrado
    } catch (error: unknown) {
      // Manejo seguro del error
      if (error instanceof Error) {
        throw new InternalServerErrorException(`Error al obtener el evento: ${error.message}`);
      }
      throw new InternalServerErrorException('Error inesperado al obtener el evento');
    }
  }
}
