import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ImagenesService } from './imagenes.service';
import { CreateImagenDto } from './dto/create-imagen.dto';

@Controller('imagenes')
export class ImagenesController {
  constructor(private readonly imagenesService: ImagenesService) {}

  @Post()
  create(@Body() createImagenDto: CreateImagenDto) {
    return this.imagenesService.create(createImagenDto);
  }

  @Get()
  findAll() {
    return this.imagenesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagenesService.findOne(+id);
  }
}
