import { IsString, IsDateString, IsOptional, Length } from 'class-validator';

/**
 * DTO para crear un evento.
 * Valida que:
 * - título sea un texto entre 3 y 100 caracteres,
 * - descripción sea un texto entre 5 y 500 caracteres,
 * - fecha sea una cadena en formato ISO 8601,
 * - lugar sea opcional, texto hasta 100 caracteres.
 */
export class CreateEventoDto {
  @IsString({ message: 'El título debe ser un texto' })
  @Length(3, 100, {
    message: 'El título debe tener entre 3 y 100 caracteres',
  })
  titulo!: string;

  @IsString({ message: 'La descripción debe ser un texto' })
  @Length(5, 500, {
    message: 'La descripción debe tener entre 5 y 500 caracteres',
  })
  descripcion!: string;

  @IsDateString({}, {
    message: 'La fecha debe tener formato ISO válido (ej: 2025-07-16T10:00:00.000Z)',
  })
  fecha!: string; // ✅ debe enviarse como string ISO desde el frontend o usar .toISOString() en backend

  @IsOptional()
  @IsString({ message: 'El lugar debe ser un texto' })
  @Length(1, 100, {
    message: 'El lugar debe tener entre 1 y 100 caracteres si se proporciona',
  })
  lugar?: string;
}
