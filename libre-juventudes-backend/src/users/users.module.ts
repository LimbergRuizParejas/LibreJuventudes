import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

/**
 * Módulo Users:
 * - Importa TypeOrmModule con la entidad User
 * - Registra el controlador UsersController
 * - Registra el servicio UsersService
 * - Exporta el servicio para poder usarlo en auth.module
 */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
