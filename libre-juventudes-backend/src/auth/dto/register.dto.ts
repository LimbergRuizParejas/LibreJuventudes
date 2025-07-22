import {
  IsEmail,
  IsOptional,
  IsString,
  MinLength,
  Length,
} from 'class-validator';

/**
 * DTO para el registro de usuarios con imagen y ubicación.
 * La imagen se manejará directamente desde el controller con Multer, por lo tanto,
 * no se valida con class-validator.
 */
export class RegisterDto {
  @IsString({ message: 'El nombre debe ser un texto' })
  @Length(2, 50, {
    message: 'El nombre debe tener entre 2 y 50 caracteres',
  })
  nombre!: string;

  @IsEmail({}, { message: 'El correo debe ser un email válido' })
  email!: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(6, {
    message: 'La contraseña debe tener al menos 6 caracteres',
  })
  password!: string;

  @IsOptional()
  @IsString({ message: 'La ubicación debe ser un texto' })
  @Length(2, 100, {
    message: 'La ubicación debe tener entre 2 y 100 caracteres',
  })
  ubicacion?: string;

  /**
   * Este campo es opcional y será procesado por Multer desde el controlador.
   * Por eso no usamos validadores aquí.
   */
  @IsOptional()
  imagen?: any; // No uses Express.Multer.File directamente si TypeScript no lo reconoce aún
}
