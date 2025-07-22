import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('debería retornar el mensaje de bienvenida', () => {
    expect(appController.getHello()).toBe(
      '¡Bienvenido a la API de Libre Juventudes!',
    );
  });
});
