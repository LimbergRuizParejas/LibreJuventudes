/**
 * Interfaz que representa a un usuario autenticado o registrado
 * dentro del sistema, útil tanto para el frontend como para el consumo de la API.
 */
export interface Usuario {
  /**
   * Identificador único del usuario
   */
  id: number;

  /**
   * Nombre completo del usuario
   */
  nombre: string;

  /**
   * Correo electrónico único del usuario
   */
  email: string;

  /**
   * Rol del usuario: define el nivel de acceso dentro del sistema
   */
  rol: 'usuario' | 'admin';
}
