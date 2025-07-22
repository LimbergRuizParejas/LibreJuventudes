import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Request } from 'express';

/**
 * Este guard compara los roles necesarios (definidos con @Roles)
 * con el rol del usuario que viene del JWT decodificado.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtiene los roles requeridos del decorador @Roles
    const rolesRequeridos = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!rolesRequeridos) {
      return true; // Si no hay roles definidos, permite el acceso
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { rol: string }; // aseguramos el tipo explícitamente

    return rolesRequeridos.includes(user.rol);
  }
}
