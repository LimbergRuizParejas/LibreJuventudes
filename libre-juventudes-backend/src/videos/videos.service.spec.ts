import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from './videos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entities/video.entity';

describe('VideosService', () => {
  let service: VideosService;
  let repo: Repository<Video>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        {
          provide: getRepositoryToken(Video),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VideosService>(VideosService);
    repo = module.get<Repository<Video>>(getRepositoryToken(Video));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un video', async () => {
    const data = { titulo: 'Video', url: 'https://youtube.com' };
    jest.spyOn(repo, 'create').mockReturnValue(data as Video);
    jest.spyOn(repo, 'save').mockResolvedValue(data as Video);

    expect(await service.create(data)).toEqual(data);
  });

  it('debería retornar todos los videos', async () => {
    const videos = [{ id: 1, titulo: 'Video' }];
    jest.spyOn(repo, 'find').mockResolvedValue(videos as Video[]);

    expect(await service.findAll()).toEqual(videos);
  });

  it('debería retornar un video por id', async () => {
    const video = { id: 1, titulo: 'Video' };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(video as Video);

    expect(await service.findOne(1)).toEqual(video);
  });

  it('debería lanzar un error si no encuentra el video', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(
      'Video con id 99 no encontrado',
    );
  });
});
