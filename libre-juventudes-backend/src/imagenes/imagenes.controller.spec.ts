import { Test, TestingModule } from '@nestjs/testing';
import { ImagenesController } from './imagenes.controller';
import { ImagenesService } from './imagenes.service';
import { CreateImagenDto } from './dto/create-imagen.dto';

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
      url: 'http://img.com/1.jpg',
      descripcion: 'Bonita',
    };
    const result = { id: 1, ...dto };
    jest.spyOn(service, 'create').mockResolvedValue(result as any);

    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('debería retornar todas las imágenes', async () => {
    const imagenes = [{ id: 1, titulo: 'Foto' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(imagenes as any);

    expect(await controller.findAll()).toEqual(imagenes);
  });

  it('debería retornar una imagen por id', async () => {
    const imagen = { id: 1, titulo: 'Foto' };
    jest.spyOn(service, 'findOne').mockResolvedValue(imagen as any);

    expect(await controller.findOne('1')).toEqual(imagen);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
