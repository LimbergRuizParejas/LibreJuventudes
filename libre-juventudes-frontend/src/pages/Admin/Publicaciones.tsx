import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getPublicaciones, deletePublicacion } from '../../services/api';

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

  const isAdmin = user?.rol === 'admin';

  useEffect(() => {
    const cargarPublicaciones = async () => {
      try {
        const data = await getPublicaciones();
        setPublicaciones(data);
      } catch (error) {
        console.error(error);
        setError('No se pudieron cargar las publicaciones');
      }
    };

    if (!isAuthenticated || !isAdmin) {
      navigate('/');
      return;
    }

    cargarPublicaciones();
  }, [isAuthenticated, isAdmin, navigate]);

  const handleDelete = async (id: number) => {
    const confirmar = confirm('¿Estás seguro de eliminar esta publicación?');
    if (!confirmar) return;

    try {
      await deletePublicacion(id);
      setPublicaciones((prev) => prev.filter((pub) => pub.id !== id));
    } catch (error) {
      console.error(error);
      setError('Error al eliminar la publicación');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Gestión de Publicaciones</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

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
