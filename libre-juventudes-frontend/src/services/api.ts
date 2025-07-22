const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// ----------------------------- TIPOS -----------------------------

export type Publicacion = {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string;
};

export type Imagen = {
  id: number;
  url: string;
  titulo?: string;
  descripcion?: string;
};

export type Usuario = {
  id: number;
  nombre: string;
  email: string;
  rol: 'usuario' | 'admin';
};

// Tipo para datos crudos de la API (por si falta `rol`)
type RawUsuario = {
  id: number;
  nombre: string;
  email: string;
  rol?: 'usuario' | 'admin';
};

// ------------------------ PUBLICACIONES ------------------------

export const getPublicaciones = async (): Promise<Publicacion[]> => {
  const res = await fetch(`${API_URL}/publicaciones`);
  if (!res.ok) {
    throw new Error(`Error al obtener publicaciones: ${res.statusText}`);
  }
  return await res.json();
};

export const deletePublicacion = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/publicaciones/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(`Error al eliminar la publicación: ${res.statusText}`);
  }
};

// --------------------------- IMÁGENES ---------------------------

export const getImagenes = async (): Promise<Imagen[]> => {
  const res = await fetch(`${API_URL}/imagenes`);
  if (!res.ok) {
    throw new Error(`Error al obtener las imágenes: ${res.statusText}`);
  }
  return await res.json();
};

// ---------------------------- USUARIOS ----------------------------

export const getUsuarios = async (): Promise<Usuario[]> => {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) {
    throw new Error(`Error al obtener usuarios: ${res.statusText}`);
  }

  const data: RawUsuario[] = await res.json();

  // Normalización segura de usuarios
  return data.map((u) => ({
    id: u.id,
    nombre: u.nombre,
    email: u.email,
    rol: u.rol ?? 'usuario',
  }));
};

export const updateUserRole = async (
  id: number,
  rol: 'usuario' | 'admin'
): Promise<Usuario> => {
  const res = await fetch(`${API_URL}/users/${id}/role`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ rol }),
  });

  if (!res.ok) {
    throw new Error(`Error al actualizar el rol: ${res.statusText}`);
  }

  const user: RawUsuario = await res.json();

  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    rol: user.rol ?? 'usuario',
  };
};
