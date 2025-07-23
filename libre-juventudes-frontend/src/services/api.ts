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
  ubicacion?: string;
  imagen?: string;
};

type RawUsuario = {
  id: number;
  nombre: string;
  email: string;
  rol?: 'usuario' | 'admin';
  ubicacion?: string;
  imagen?: string;
};

// ------------------------ PUBLICACIONES ------------------------

/**
 * Obtener todas las publicaciones
 */
export const getPublicaciones = async (): Promise<Publicacion[]> => {
  const res = await fetch(`${API_URL}/publicaciones`);
  if (!res.ok) {
    throw new Error(`Error al obtener publicaciones: ${res.statusText}`);
  }
  return await res.json();
};

/**
 * Crear una nueva publicación
 */
export const createPublicacion = async (data: {
  titulo: string;
  contenido: string;
}): Promise<Publicacion> => {
  const res = await fetch(`${API_URL}/publicaciones`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error al crear publicación: ${res.statusText}`);
  }

  return await res.json();
};

/**
 * Actualizar una publicación existente
 */
export const updatePublicacion = async (
  id: number,
  data: { titulo: string; contenido: string }
): Promise<Publicacion> => {
  const res = await fetch(`${API_URL}/publicaciones/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Error al actualizar publicación: ${res.statusText}`);
  }

  return await res.json();
};

/**
 * Eliminar una publicación
 */
export const deletePublicacion = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/publicaciones/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Error al eliminar la publicación: ${res.statusText}`);
  }
};

// --------------------------- IMÁGENES ---------------------------

/**
 * Obtener todas las imágenes del backend
 */
export const getImagenes = async (): Promise<Imagen[]> => {
  const res = await fetch(`${API_URL}/imagenes`);
  if (!res.ok) {
    throw new Error(`Error al obtener las imágenes: ${res.statusText}`);
  }
  return await res.json();
};

/**
 * Crear una nueva imagen (usa FormData con archivo y campos)
 */
export const createImagen = async (formData: FormData): Promise<Imagen> => {
  const res = await fetch(`${API_URL}/imagenes`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Error al crear imagen: ${res.statusText}`);
  }

  return await res.json();
};

/**
 * Actualizar una imagen existente (usa FormData)
 */
export const updateImagen = async (id: number, formData: FormData): Promise<Imagen> => {
  const res = await fetch(`${API_URL}/imagenes/${id}`, {
    method: 'PUT',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Error al actualizar imagen: ${res.statusText}`);
  }

  return await res.json();
};

/**
 * Eliminar una imagen por su ID
 */
export const deleteImagen = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/imagenes/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error(`Error al eliminar imagen: ${res.statusText}`);
  }
};

// ---------------------------- USUARIOS ----------------------------

/**
 * Obtener todos los usuarios
 */
export const getUsuarios = async (): Promise<Usuario[]> => {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) {
    throw new Error(`Error al obtener usuarios: ${res.statusText}`);
  }

  const data: RawUsuario[] = await res.json();

  return data.map((u) => ({
    id: u.id,
    nombre: u.nombre,
    email: u.email,
    rol: u.rol ?? 'usuario',
    ubicacion: u.ubicacion ?? '',
    imagen: u.imagen ?? '',
  }));
};

/**
 * Actualizar el rol de un usuario
 */
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
    ubicacion: user.ubicacion ?? '',
    imagen: user.imagen ?? '',
  };
};
