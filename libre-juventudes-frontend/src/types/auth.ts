import { Usuario } from './user';

/**
 * Tipo del contexto de autenticación global.
 * Define las funciones y datos que provee el AuthProvider a toda la aplicación.
 */
export interface AuthContextType {
  /**
   * Inicia sesión con correo y contraseña.
   * @param email - Correo electrónico del usuario.
   * @param password - Contraseña del usuario.
   * @returns Promesa que resuelve con el usuario autenticado.
   */
  login: (email: string, password: string) => Promise<Usuario>;

  /**
   * Registra un nuevo usuario enviando un FormData (para soportar imagen).
   * @param formData - FormData con campos como nombre, email, password, ubicación, imagen, etc.
   * @returns Promesa que resuelve con el usuario registrado.
   */
  register: (formData: FormData) => Promise<Usuario>;

  /**
   * Cierra la sesión del usuario actual.
   * Elimina el usuario y el token del estado y del localStorage.
   */
  logout: () => void;

  /**
   * Información del usuario actualmente autenticado o null si no hay sesión.
   */
  user: Usuario | null;

  /**
   * Indica si actualmente hay un usuario autenticado.
   */
  isAuthenticated: boolean;
}
