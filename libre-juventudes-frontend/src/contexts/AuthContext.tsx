import { createContext } from 'react';
import { AuthContextType } from '../types/auth';

/**
 * Contexto global de autenticación
 */
export const AuthContext = createContext<AuthContextType | null>(null);
