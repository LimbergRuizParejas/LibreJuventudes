import { IsString, IsOptional } from 'class-validator';

/**
 * DTO para crear una publicación.
 * Valida que el título y contenido sean strings válidos,
 * y que la categoría sea opcional.
 */
export class CreatePublicacionDto {
  @IsString({
    message: 'El título debe ser un texto válido',
  })
  titulo!: string;

  @IsString({
    message: 'El contenido debe ser un texto válido',
  })
  contenido!: string;

  @IsOptional()
  @IsString({
    message: 'La categoría debe ser un texto válido si se proporciona',
  })
  categoria?: string;
}
