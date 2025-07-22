import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/entities/user.entity';

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registro de un nuevo usuario con imagen y ubicación opcional
   */
  async register(
    registerDto: RegisterDto,
    imagen?: Express.Multer.File,
  ): Promise<{ user: User; token: string }> {
    const { nombre, email, password, ubicacion } = registerDto;

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Si se envió imagen, guardarla en disco (opcional: puedes subirla a cloud)
    let rutaImagen: string | undefined = undefined;
    if (imagen) {
      const uploadsDir = join(__dirname, '..', '..', 'uploads');
      if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir);
      }

      const nombreArchivo = `${Date.now()}_${imagen.originalname}`;
      const rutaCompleta = join(uploadsDir, nombreArchivo);

      writeFileSync(rutaCompleta, imagen.buffer);
      rutaImagen = `/uploads/${nombreArchivo}`; // para exponerla públicamente si deseas
    }

    try {
      const user = await this.usersService.create({
        nombre,
        email,
        password: hashedPassword,
        ubicacion,
        imagen: rutaImagen,
      });

      const payload = { sub: user.id, email: user.email, rol: user.rol };
      const token = this.jwtService.sign(payload);

      return { user, token };
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('El correo ya está registrado');
      }

      console.error('❌ Error en register:', error);
      throw new InternalServerErrorException('Error interno en el registro');
    }
  }

  /**
   * Login del usuario
   */
  async login(loginDto: LoginDto): Promise<{ user: User; token: string }> {
    const { email, password } = loginDto;

    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { sub: user.id, email: user.email, rol: user.rol };
    const token = this.jwtService.sign(payload);

    return { user, token };
  }
}
