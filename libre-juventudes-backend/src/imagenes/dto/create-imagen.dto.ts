import { IsString, IsOptional } from 'class-validator';

/**
 * DTO para crear una imagen.
 * Valida que el título y la URL sean textos,
 * y la descripción sea opcional.
 */
export class CreateImagenDto {
  @IsString({
    message: 'El título debe ser un texto válido',
  })
  titulo!: string;

  @IsString({
    message: 'La URL debe ser un texto válido',
  })
  url!: string;

  @IsOptional()
  @IsString({
    message: 'La descripción debe ser un texto válido si se proporciona',
  })
  descripcion?: string;
}
