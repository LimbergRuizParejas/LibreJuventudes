import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const mockUsersService = {
      create: jest.fn().mockResolvedValue({
        id: 1,
        nombre: 'Juan',
        email: 'juan@mail.com',
        password: 'hashed',
        rol: 'usuario',
        creadoEn: new Date(),
      }),
      findOneByEmail: jest.fn().mockResolvedValue({
        id: 1,
        nombre: 'Juan',
        email: 'juan@mail.com',
        password: 'hashed',
        rol: 'usuario',
        creadoEn: new Date(),
      }),
    };

    const mockJwtService = {
      sign: jest.fn().mockReturnValue('fake-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería crear un usuario', async () => {
    const dto: RegisterDto = {
      nombre: 'Juan',
      email: 'juan@mail.com',
      password: '123456',
    };
    const result: User = {
      id: 1,
      nombre: 'Juan',
      email: 'juan@mail.com',
      password: 'hashed',
      rol: 'usuario',
      creadoEn: new Date(),
    };

    // Uso de jest.fn para mockear el comportamiento del servicio
    jest.spyOn(authService, 'register').mockResolvedValue(result);

    await expect(controller.register(dto)).resolves.toEqual(result);
    expect(authService.register).toHaveBeenCalledWith(dto);
  });

  it('debería iniciar sesión y devolver un token', async () => {
    const dto: LoginDto = {
      email: 'juan@mail.com',
      password: '123456',
    };

    const result = { access_token: 'fake-jwt-token' };

    jest.spyOn(authService, 'login').mockResolvedValue(result);

    await expect(controller.login(dto)).resolves.toEqual(result);
    expect(authService.login).toHaveBeenCalledWith(dto);
  });
});
