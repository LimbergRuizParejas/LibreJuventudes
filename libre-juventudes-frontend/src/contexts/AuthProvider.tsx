// src/contexts/AuthProvider.tsx
import { useState, useEffect, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { AuthContextType } from '../types/auth';
import { Usuario } from '../types/user';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const isAuthenticated = !!user;

  /**
   * Inicia sesión con email y password.
   */
  const login = async (email: string, password: string): Promise<Usuario> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciales incorrectas');
      }

      const data: { user: Usuario; token: string } = await response.json();
      setUser(data.user);
      localStorage.setItem('token', data.token);

      return data.user;
    } catch (error: unknown) {
      console.error('❌ Error al iniciar sesión:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Error inesperado al iniciar sesión'
      );
    }
  };

  /**
   * Registra un nuevo usuario usando FormData (nombre, email, password, imagen, ubicación).
   */
  const register = async (formData: FormData): Promise<Usuario> => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrarse');
      }

      const data: { user: Usuario; token: string } = await response.json();
      setUser(data.user);
      localStorage.setItem('token', data.token);

      return data.user;
    } catch (error: unknown) {
      console.error('❌ Error al registrar usuario:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Error inesperado al registrarse'
      );
    }
  };

  /**
   * Cierra la sesión: limpia token y usuario.
   */
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('token');
    // La redirección debe hacerse desde el componente usando useNavigate()
  };

  /**
   * Recupera perfil automáticamente si hay token al cargar la app.
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error();

        const data: { user: Usuario } = await response.json();
        setUser(data.user);
      } catch {
        logout(); // token inválido o expirado
      }
    };

    fetchProfile();
  }, []);

  const contextValue: AuthContextType = {
    login,
    register,
    logout,
    user,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
