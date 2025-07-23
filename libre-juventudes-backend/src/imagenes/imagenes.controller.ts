import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagenesService } from './imagenes.service';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { Imagen } from './entities/imagen.entity';

@Controller('imagenes')
export class ImagenesController {
  constructor(private readonly imagenesService: ImagenesService) {}

  /**
   * Crea una nueva imagen con un archivo subido (multipart/form-data).
   * Valida que el archivo esté presente antes de delegar al servicio.
   */
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImagenDto: CreateImagenDto,
  ): Promise<Imagen> {
    if (!file) {
      throw new BadRequestException('Debe proporcionar un archivo de imagen');
    }
    return this.imagenesService.create(createImagenDto, file);
  }

  /**
   * Obtiene todas las imágenes ordenadas por fecha de creación descendente.
   */
  @Get()
  findAll(): Promise<Imagen[]> {
    return this.imagenesService.findAll();
  }

  /**
   * Obtiene una imagen específica por su ID.
   * @param id ID numérico validado con ParseIntPipe.
   */
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Imagen> {
    return this.imagenesService.findOne(id);
  }
}
