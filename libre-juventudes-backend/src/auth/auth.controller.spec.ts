import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import {  RolUsuario } from '../users/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let service: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const mockAuthService: jest.Mocked<AuthService> = {
      register: jest.fn().mockResolvedValue({
        user: {
          id: 1,
          nombre: 'Juan',
          email: 'juan@mail.com',
          password: 'hashed',
          rol: 'usuario' as RolUsuario, // ✅ corregido para que sea del tipo correcto
          creadoEn: new Date(),
        },
        token: 'mock-token',
      }),
      login: jest.fn().mockResolvedValue({
        user: {
          id: 1,
          nombre: 'Juan',
          email: 'juan@mail.com',
          password: 'hashed',
          rol: 'usuario' as RolUsuario,
          creadoEn: new Date(),
        },
        token: 'mock-token',
      }),
    } as unknown as jest.Mocked<AuthService>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get(AuthService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('debería registrar un usuario y devolver user + token', async () => {
    const registerDto: RegisterDto = {
      nombre: 'Juan',
      email: 'juan@mail.com',
      password: '123456',
    };

    const response = await controller.register(registerDto);
    expect(response).toEqual({
      user: expect.objectContaining({
        id: 1,
        nombre: 'Juan',
        email: 'juan@mail.com',
        rol: 'usuario',
      }),
      token: 'mock-token',
    });

    expect(service.register).toHaveBeenCalledWith(registerDto, undefined);
  });

  it('debería iniciar sesión y devolver user + token', async () => {
    const loginDto: LoginDto = {
      email: 'juan@mail.com',
      password: '123456',
    };

    const response = await controller.login(loginDto);
    expect(response).toEqual({
      user: expect.any(Object),
      token: 'mock-token',
    });

    expect(service.login).toHaveBeenCalledWith(loginDto);
  });
});
