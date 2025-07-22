import { Test, TestingModule } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';

describe('VideosController', () => {
  let controller: VideosController;
  let service: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        {
          provide: VideosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VideosController>(VideosController);
    service = module.get<VideosService>(VideosService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear un video', async () => {
    const dto: CreateVideoDto = {
      titulo: 'Video',
      url: 'https://youtube.com',
      descripcion: 'Test',
    };
    const result = { id: 1, ...dto };
    jest.spyOn(service, 'create').mockResolvedValue(result as any);

    expect(await controller.create(dto)).toEqual(result);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('debería retornar todos los videos', async () => {
    const videos = [{ id: 1, titulo: 'Video' }];
    jest.spyOn(service, 'findAll').mockResolvedValue(videos as any);

    expect(await controller.findAll()).toEqual(videos);
  });

  it('debería retornar un video por id', async () => {
    const video = { id: 1, titulo: 'Video' };
    jest.spyOn(service, 'findOne').mockResolvedValue(video as any);

    expect(await controller.findOne('1')).toEqual(video);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });
});
