// src/hooks/useAuth.ts
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { AuthContextType } from '../types/auth';

/**
 * Hook personalizado para acceder al contexto de autenticación
 * Asegura que se use dentro de un AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined || context === null) {
    throw new Error('❌ useAuth debe usarse dentro de un <AuthProvider>');
  }

  return context;
};
