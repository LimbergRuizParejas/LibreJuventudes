import { Test, TestingModule } from '@nestjs/testing';
import { ImagenesController } from './imagenes.controller';
import { ImagenesService } from './imagenes.service';
import { CreateImagenDto } from './dto/create-imagen.dto';
import { Imagen } from './entities/imagen.entity';

describe('ImagenesController', () => {
  let controller: ImagenesController;
  let service: ImagenesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagenesController],
      providers: [
        {
          provide: ImagenesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ImagenesController>(ImagenesController);
    service = module.get<ImagenesService>(ImagenesService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear una imagen', async () => {
    const dto: CreateImagenDto = {
      titulo: 'Foto',
      descripcion: 'Bonita',
    };

    // Simular archivo subido
    const file = {
      originalname: 'foto.jpg',
      filename: 'foto123.jpg',
      mimetype: 'image/jpeg',
      path: 'uploads/foto123.jpg',
    } as Express.Multer.File;

    const imagenEsperada: Imagen = {
      id: 1,
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      url: file.filename,
    };

    jest.spyOn(service, 'create').mockResolvedValue(imagenEsperada);

    const resultado = await controller.create(file, dto);
    expect(resultado).toEqual(imagenEsperada);
    expect(service.create).toHaveBeenCalledWith({
      ...dto,
      url: file.filename,
    });
  });

  it('debería retornar todas las imágenes', async () => {
    const imagenes = [{ id: 1, titulo: 'Foto', url: 'img.jpg' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(imagenes as any);

    const resultado = await controller.findAll();
    expect(resultado).toEqual(imagenes);
  });

  it('debería retornar una imagen por id', async () => {
    const imagen = { id: 1, titulo: 'Foto', url: 'img.jpg' };
    jest.spyOn(service, 'findOne').mockResolvedValue(imagen as any);

    const resultado = await controller.findOne('1');
    expect(resultado).toEqual(imagen);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
