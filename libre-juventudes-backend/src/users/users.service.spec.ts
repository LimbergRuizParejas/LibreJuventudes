import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('debería estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debería crear un usuario', async () => {
    const data = { nombre: 'Ana', email: 'ana@mail.com', password: '123456' };
    jest.spyOn(repo, 'create').mockReturnValue(data as User);
    jest.spyOn(repo, 'save').mockResolvedValue(data as User);

    expect(await service.create(data)).toEqual(data);
  });

  it('debería retornar todos los usuarios', async () => {
    const usuarios = [{ id: 1, nombre: 'Ana' }];
    jest.spyOn(repo, 'find').mockResolvedValue(usuarios as User[]);

    expect(await service.findAll()).toEqual(usuarios);
  });

  it('debería retornar un usuario por id', async () => {
    const user = { id: 1, nombre: 'Ana' };
    jest.spyOn(repo, 'findOneBy').mockResolvedValue(user as User);

    expect(await service.findOne(1)).toEqual(user);
  });

  it('debería actualizar el rol del usuario', async () => {
    const user = { id: 1, nombre: 'Ana', rol: 'usuario' };
    jest.spyOn(service, 'findOne').mockResolvedValue(user as User);
    jest
      .spyOn(repo, 'save')
      .mockResolvedValue({ ...user, rol: 'admin' } as User);

    const result = await service.updateRole(1, { rol: 'admin' });
    expect(result.rol).toBe('admin');
  });
});
