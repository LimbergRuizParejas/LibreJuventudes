import { Test, TestingModule } from '@nestjs/testing';
import { ImagenesService } from './imagenes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imagen } from './entities/imagen.entity';

describe('ImagenesService', () => {
  let service: ImagenesService;
  let repo: Repository<Imagen>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagenesService,
        {
          provide: getRepositoryToken(Imagen),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ImagenesService>(ImagenesService);
    repo = module.get<Repository<Imagen>>(getRepositoryToken(Imagen));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear una imagen', async () => {
    const data = { titulo: 'Foto', url: 'http://img.com/1.jpg' };
    jest.spyOn(repo, 'create').mockReturnValue(data as Imagen);
    jest.spyOn(repo, 'save').mockResolvedValue(data as Imagen);

    expect(await service.create(data)).toEqual(data);
  });

  it('debería listar todas las imágenes', async () => {
    const imagenes = [{ id: 1, titulo: 'Foto' }];
    jest.spyOn(repo, 'find').mockResolvedValue(imagenes as Imagen[]);

    expect(await service.findAll()).toEqual(imagenes);
  });

  it('debería retornar una imagen por id', async () => {
    const imagen = { id: 1, titulo: 'Foto' };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(imagen as Imagen);

    expect(await service.findOne(1)).toEqual(imagen);
  });

  it('debería lanzar error si no encuentra imagen', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(
      'Imagen con id 99 no encontrada',
    );
  });
});
