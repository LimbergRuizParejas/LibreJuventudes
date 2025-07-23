import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  getPublicaciones,
  deletePublicacion,
  createPublicacion,
  updatePublicacion,
} from '../../services/api';

type Publicacion = {
  id: number;
  titulo: string;
  contenido: string;
};

const Publicaciones = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const isAdmin = user?.rol === 'admin';

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/');
      return;
    }

    cargarPublicaciones();
  }, [isAuthenticated, isAdmin, navigate]);

  const cargarPublicaciones = async () => {
    try {
      const data = await getPublicaciones();
      setPublicaciones(data);
    } catch (error) {
      console.error(error);
      setError('No se pudieron cargar las publicaciones');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !contenido.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      if (editandoId !== null) {
        const actualizada = await updatePublicacion(editandoId, {
          titulo,
          contenido,
        });
        setPublicaciones((prev) =>
          prev.map((p) => (p.id === editandoId ? actualizada : p))
        );
        setEditandoId(null);
      } else {
        const nueva = await createPublicacion({ titulo, contenido });
        setPublicaciones((prev) => [nueva, ...prev]);
      }

      setTitulo('');
      setContenido('');
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error al guardar la publicación');
    }
  };

  const handleEdit = (pub: Publicacion) => {
    setTitulo(pub.titulo);
    setContenido(pub.contenido);
    setEditandoId(pub.id);
  };

  const handleDelete = async (id: number) => {
    const confirmar = confirm('¿Estás seguro de eliminar esta publicación?');
    if (!confirmar) return;

    try {
      await deletePublicacion(id);
      setPublicaciones((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      setError('Error al eliminar la publicación');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Gestión de Publicaciones
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md mb-8 space-y-4"
      >
        <h2 className="text-lg font-semibold">
          {editandoId ? 'Editar publicación' : 'Nueva publicación'}
        </h2>

        {error && <p className="text-red-600">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="Ej: Título llamativo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contenido</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            rows={4}
            placeholder="Contenido de la publicación"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editandoId ? 'Actualizar' : 'Publicar'}
          </button>
          {editandoId && (
            <button
              type="button"
              onClick={() => {
                setEditandoId(null);
                setTitulo('');
                setContenido('');
                setError(null);
              }}
              className="text-gray-600 hover:underline"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de publicaciones */}
      <div className="space-y-4">
        {publicaciones.length > 0 ? (
          publicaciones.map((pub) => (
            <div
              key={pub.id}
              className="bg-white p-4 shadow rounded border-l-4 border-blue-600"
            >
              <h2 className="text-xl font-semibold">{pub.titulo}</h2>
              <p className="text-gray-700 whitespace-pre-line">{pub.contenido}</p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleEdit(pub)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(pub.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay publicaciones registradas.</p>
        )}
      </div>
    </div>
  );
};

export default Publicaciones;
