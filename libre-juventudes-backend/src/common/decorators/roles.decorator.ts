import { SetMetadata } from '@nestjs/common';

/**
 * Este decorador permite asignar roles a rutas.
 * Ejemplo de uso:
 *
 * @Roles('admin')
 * @Get('solo-admins')
 * findSoloAdmins() { ... }
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
