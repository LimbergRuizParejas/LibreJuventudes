import { Controller, Post, Body, Get, Param, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { VideosService } from '../videos/videos.service';
import { CreateVideoDto } from '../videos/dto/create-video.dto';
import { Video } from '../videos/entities/video.entity';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  /**
   * Crea un video
   * @param createVideoDto Datos del nuevo video
   * @returns Video creado
   */
  @Post()
  async create(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
    try {
      return await this.videosService.create(createVideoDto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(`Error al crear el video: ${error.message}`);
      }
      throw new InternalServerErrorException('Error inesperado al crear el video');
    }
  }

  /**
   * Obtiene todos los videos
   * @returns Lista de videos
   */
  @Get()
  async findAll(): Promise<Video[]> {
    try {
      return await this.videosService.findAll();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(`Error al obtener los videos: ${error.message}`);
      }
      throw new InternalServerErrorException('Error inesperado al obtener los videos');
    }
  }

  /**
   * Obtiene un video por ID
   * @param id ID del video
   * @returns Video encontrado
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Video> {
    try {
      const video = await this.videosService.findOne(+id);
      if (!video) {
        throw new NotFoundException(`Video con ID ${id} no encontrado`);
      }
      return video;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(`Error al obtener el video: ${error.message}`);
      }
      throw new InternalServerErrorException('Error inesperado al obtener el video');
    }
  }
}
