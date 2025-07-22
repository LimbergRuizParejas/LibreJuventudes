import { IsString, IsUrl, IsOptional, Length } from 'class-validator';

/**
 * DTO para crear un video.
 * Valida que el título sea un texto y que la URL tenga un formato correcto.
 */
export class CreateVideoDto {
  @IsString({
    message: 'El título debe ser un texto válido',
  })
  @Length(3, 100, {
    message: 'El título debe tener entre 3 y 100 caracteres',
  })
  titulo!: string;

  @IsUrl(
    {},
    {
      message: 'La URL debe tener un formato válido (ej: https://...)',
    },
  )
  url!: string;

  @IsOptional() // La descripción es opcional
  @IsString({
    message: 'La descripción debe ser un texto válido',
  })
  @Length(5, 500, {
    message: 'La descripción debe tener entre 5 y 500 caracteres',
  })
  descripcion?: string; // Se añadió la propiedad descripcion, opcional
}
