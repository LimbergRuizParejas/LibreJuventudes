import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Express } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registro de usuario con imagen (formulario multipart/form-data)
   */
  @Post('register')
  @UseInterceptors(FileInterceptor('imagen')) // 👈 'imagen' es el nombre del campo del archivo
  async register(
    @Body() registerDto: RegisterDto,
    @UploadedFile() imagen?: Express.Multer.File, // tipo reconocido tras instalar @types/multer
  ) {
    return this.authService.register(registerDto, imagen);
  }

  /**
   * Inicio de sesión de usuario (JSON normal)
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
