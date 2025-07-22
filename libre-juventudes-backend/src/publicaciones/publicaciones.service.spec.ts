import { Test, TestingModule } from '@nestjs/testing';
import { PublicacionesService } from './publicaciones.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacion } from './entities/publicacion.entity';

describe('PublicacionesService', () => {
  let service: PublicacionesService;
  let repo: Repository<Publicacion>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublicacionesService,
        {
          provide: getRepositoryToken(Publicacion),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PublicacionesService>(PublicacionesService);
    repo = module.get<Repository<Publicacion>>(getRepositoryToken(Publicacion));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear una publicación', async () => {
    const data = { titulo: 'Post', contenido: 'Texto' };
    jest.spyOn(repo, 'create').mockReturnValue(data as Publicacion);
    jest.spyOn(repo, 'save').mockResolvedValue(data as Publicacion);

    expect(await service.create(data)).toEqual(data);
  });

  it('debería retornar todas las publicaciones', async () => {
    const publicaciones = [{ id: 1, titulo: 'Post' }];
    jest.spyOn(repo, 'find').mockResolvedValue(publicaciones as Publicacion[]);

    expect(await service.findAll()).toEqual(publicaciones);
  });

  it('debería retornar una publicación por id', async () => {
    const publicacion = { id: 1, titulo: 'Post' };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(publicacion as Publicacion);

    expect(await service.findOne(1)).toEqual(publicacion);
  });

  it('debería lanzar error si no encuentra la publicación', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(
      'Publicación con id 99 no encontrada',
    );
  });
});
