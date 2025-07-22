import { Test, TestingModule } from '@nestjs/testing';
import { EventosService } from './eventos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Evento } from './entities/evento.entity';
import { Repository } from 'typeorm';
import { CreateEventoDto } from './dto/create-evento.dto';
import { NotFoundException } from '@nestjs/common';

describe('EventosService', () => {
  let service: EventosService;
  let repo: Repository<Evento>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventosService,
        {
          provide: getRepositoryToken(Evento),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EventosService>(EventosService);
    repo = module.get<Repository<Evento>>(getRepositoryToken(Evento));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un evento', async () => {
    const dto: CreateEventoDto = {
      titulo: 'Fiesta',
      descripcion: 'Con música y luces',
      fecha: new Date().toISOString(),
      lugar: 'Salón de eventos',
    };

    const eventoMock: Evento = {
      id: 1,
      ...dto,
      fecha: new Date(dto.fecha), // 👈 Aquí convertimos string a Date
      creadoEn: new Date(),
    };

    jest.spyOn(repo, 'create').mockReturnValue(eventoMock);
    jest.spyOn(repo, 'save').mockResolvedValue(eventoMock);

    const result = await service.create(dto);
    expect(result).toEqual(eventoMock);
  });

  it('debería obtener todos los eventos', async () => {
    const eventos = [{
      id: 1,
      titulo: 'Evento1',
      descripcion: 'Desc',
      fecha: new Date(),
      creadoEn: new Date(),
    }] as Evento[];

    jest.spyOn(repo, 'find').mockResolvedValue(eventos);

    const result = await service.findAll();
    expect(result).toEqual(eventos);
  });

  it('debería encontrar un evento por id', async () => {
    const evento = {
      id: 1,
      titulo: 'Evento1',
      descripcion: 'Desc',
      fecha: new Date(),
      creadoEn: new Date(),
    } as Evento;

    jest.spyOn(repo, 'findOneBy').mockResolvedValue(evento);

    const result = await service.findOne(1);
    expect(result).toEqual(evento);
  });

  it('debería lanzar error si no encuentra evento por id', async () => {
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);

    await expect(service.findOne(99)).rejects.toThrow(
      new NotFoundException('Evento con id 99 no encontrado'),
    );
  });
});
