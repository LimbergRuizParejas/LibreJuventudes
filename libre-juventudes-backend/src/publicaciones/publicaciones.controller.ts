import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';

@Controller('publicaciones')
export class PublicacionesController {
  constructor(private readonly publicacionesService: PublicacionesService) {}

  /**
   * Crea una nueva publicación
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreatePublicacionDto) {
    return await this.publicacionesService.create(createDto);
  }

  /**
   * Obtiene todas las publicaciones
   */
  @Get()
  async findAll() {
    return await this.publicacionesService.findAll();
  }

  /**
   * Obtiene una publicación por su ID
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.publicacionesService.findOne(id);
  }

  /**
   * Elimina una publicación por su ID
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.publicacionesService.remove(id);
  }
}
