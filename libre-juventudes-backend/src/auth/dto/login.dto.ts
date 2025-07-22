import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * DTO para login de usuario
 */
export class LoginDto {
  @IsEmail({}, { message: 'El correo debe ser un email válido' })
  email!: string;

  @IsString({ message: 'La contraseña debe ser un string' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;
}
