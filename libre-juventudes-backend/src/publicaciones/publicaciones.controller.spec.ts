import { Test, TestingModule } from '@nestjs/testing';
import { PublicacionesController } from './publicaciones.controller';
import { PublicacionesService } from './publicaciones.service';
import { CreatePublicacionDto } from './dto/create-publicacion.dto';

describe('PublicacionesController', () => {
  let controller: PublicacionesController;
  let service: PublicacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicacionesController],
      providers: [
        {
          provide: PublicacionesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PublicacionesController>(PublicacionesController);
    service = module.get<PublicacionesService>(PublicacionesService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear una publicación', async () => {
    const dto: CreatePublicacionDto = {
      titulo: 'Post',
      contenido: 'Texto',
      categoria: 'General',
    };
    const result = { id: 1, ...dto };
    jest.spyOn(service, 'create').mockResolvedValue(result as any);

    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('debería retornar todas las publicaciones', async () => {
    const publicaciones = [{ id: 1, titulo: 'Post' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(publicaciones as any);

    expect(await controller.findAll()).toEqual(publicaciones);
  });

  it('debería retornar una publicación por id', async () => {
    const publicacion = { id: 1, titulo: 'Post' };
    jest.spyOn(service, 'findOne').mockResolvedValue(publicacion as any);

    expect(await controller.findOne('1')).toEqual(publicacion);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
