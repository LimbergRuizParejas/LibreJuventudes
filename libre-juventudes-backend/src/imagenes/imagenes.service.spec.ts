import { Test, TestingModule } from '@nestjs/testing';
import { ImagenesService } from './imagenes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Imagen } from './entities/imagen.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateImagenDto } from './dto/create-imagen.dto';

describe('ImagenesService', () => {
  let service: ImagenesService;
  let repo: Repository<Imagen>;

  const mockFile = {
    originalname: 'foto.jpg',
    filename: 'foto.jpg',
    mimetype: 'image/jpeg',
    path: 'uploads/foto.jpg',
  } as Express.Multer.File;

  const imagenEntity: Imagen = {
    id: 1,
    titulo: 'Foto',
    url: 'foto.jpg',
    descripcion: 'Bonita',
    creadoEn: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagenesService,
        {
          provide: getRepositoryToken(Imagen),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ImagenesService>(ImagenesService);
    repo = module.get<Repository<Imagen>>(getRepositoryToken(Imagen));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear una imagen con archivo', async () => {
    const dto: CreateImagenDto = {
      titulo: 'Foto',
      descripcion: 'Bonita',
    };

    // Esperado objeto que se guardará
    const imagenCreada = {
      ...dto,
      url: mockFile.filename,
    };

    jest.spyOn(repo, 'create').mockReturnValue(imagenEntity);
    jest.spyOn(repo, 'save').mockResolvedValue(imagenEntity);

    const result = await service.create(dto, mockFile);

    expect(repo.create).toHaveBeenCalledWith(imagenCreada);
    expect(repo.save).toHaveBeenCalledWith(imagenEntity);
    expect(result).toEqual(imagenEntity);
  });

  it('debería listar todas las imágenes', async () => {
    const imagenes = [imagenEntity];

    jest.spyOn(repo, 'find').mockResolvedValue(imagenes);

    const result = await service.findAll();
    expect(result).toEqual(imagenes);
    expect(repo.find).toHaveBeenCalled();
  });

  it('debería retornar una imagen por ID', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(imagenEntity);

    const result = await service.findOne(1);
    expect(result).toEqual(imagenEntity);
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('debería lanzar error si no encuentra imagen', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(
      new NotFoundException('Imagen con id 999 no encontrada')
    );

    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 999 });
  });
});
