import { IsString, IsIn } from 'class-validator';

/**
 * DTO para actualizar el rol de un usuario.
 * Solo permite 'usuario' o 'admin' como valores.
 */
export class UpdateRoleDto {
  @IsString({
    message: 'El rol debe ser un texto válido',
  })
  @IsIn(['usuario', 'admin'], {
    message: 'El rol solo puede ser "usuario" o "admin"',
  })
  rol!: string;
}
