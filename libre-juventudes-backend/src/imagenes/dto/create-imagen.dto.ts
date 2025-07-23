import { IsString, IsOptional, MaxLength, Matches } from 'class-validator';

/**
 * DTO para la creación de una imagen.
 * El campo 'url' no debe enviarse desde el cliente, ya que se obtiene del archivo subido.
 * Se valida únicamente el título (obligatorio) y la descripción (opcional).
 */
export class CreateImagenDto {
  @IsString({ message: 'El título debe ser un texto válido' })
  @MaxLength(255, {
    message: 'El título no debe exceder los 255 caracteres',
  })
  @Matches(/.*\S.*/, {
    message: 'El título no puede estar vacío o contener solo espacios',
  })
  titulo!: string;

  @IsOptional()
  @IsString({
    message: 'La descripción debe ser un texto válido si se proporciona',
  })
  @MaxLength(500, {
    message: 'La descripción no debe exceder los 500 caracteres',
  })
  descripcion?: string;
}
