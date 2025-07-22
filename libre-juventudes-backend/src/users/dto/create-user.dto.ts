import { IsString, IsEmail, MinLength, IsOptional, Length } from 'class-validator';

/**
 * DTO para crear un usuario.
 * Valida nombre, email, contraseña y admite ubicación e imagen opcionales.
 */
export class CreateUserDto {
  @IsString({ message: 'El nombre debe ser un texto válido' })
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
  nombre!: string;

  @IsEmail({}, { message: 'Debe proporcionar un email válido' })
  email!: string;

  @IsString({ message: 'La contraseña debe ser un texto válido' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  @IsOptional()
  @IsString({ message: 'La ubicación debe ser un texto válido' })
  @Length(2, 100, { message: 'La ubicación debe tener entre 2 y 100 caracteres' })
  ubicacion?: string;

  @IsOptional()
  @IsString({ message: 'La ruta de imagen debe ser un texto' })
  imagen?: string; // se guarda como string, ya que se refiere a la URL o path en el backend
}
