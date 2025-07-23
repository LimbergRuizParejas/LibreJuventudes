import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  getImagenes,
  deleteImagen,
  createImagen,
  updateImagen,
} from '../../services/api';
import type { Imagen } from '../../services/api';

const Imagenes = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated || user?.rol !== 'admin') {
      navigate('/');
      return;
    }
    cargarImagenes();
  }, [isAuthenticated, user, navigate]);

  const cargarImagenes = async () => {
    try {
      const data = await getImagenes();
      setImagenes(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar las imágenes');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!titulo.trim()) {
      return setError('El título es obligatorio');
    }

    if (!editandoId && !file) {
      return setError('Debe seleccionar una imagen para subir');
    }

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      if (descripcion.trim()) {
        formData.append('descripcion', descripcion);
      }
      if (file) {
        formData.append('file', file);
      }

      if (editandoId) {
        const actualizada = await updateImagen(editandoId, formData);
        setImagenes((prev) =>
          prev.map((img) => (img.id === editandoId ? actualizada : img))
        );
      } else {
        const nueva = await createImagen(formData);
        setImagenes((prev) => [nueva, ...prev]);
      }

      limpiarFormulario();
    } catch (err) {
      console.error(err);
      setError('Error al guardar la imagen');
    }
  };

  const limpiarFormulario = () => {
    setTitulo('');
    setDescripcion('');
    setFile(null);
    setEditandoId(null);
    setError(null);
  };

  const handleEdit = (img: Imagen) => {
    setTitulo(img.titulo || '');
    setDescripcion(img.descripcion || '');
    setFile(null); // El archivo no puede ser reusado
    setEditandoId(img.id);
    setError(null);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que deseas eliminar esta imagen?')) return;
    try {
      await deleteImagen(id);
      setImagenes((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error(err);
      setError('Error al eliminar la imagen');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        🖼️ Imágenes del Carrusel
      </h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded mb-10 space-y-4"
        aria-label="Formulario de imágenes"
      >
        <h2 className="text-lg font-semibold">
          {editandoId ? 'Editar imagen' : 'Subir nueva imagen'}
        </h2>

        {error && (
          <p className="text-red-600 font-medium" role="alert">
            {error}
          </p>
        )}

        <div>
          <label htmlFor="titulo" className="block font-medium">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            id="titulo"
            type="text"
            title="Título de la imagen"
            placeholder="Ej: Imagen principal"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </div>

        <div>
          <label htmlFor="descripcion" className="block font-medium">
            Descripción
          </label>
          <textarea
            id="descripcion"
            title="Descripción de la imagen"
            placeholder="Descripción breve"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full border p-2 rounded mt-1"
            rows={3}
          />
        </div>

        <div>
          <label htmlFor="file" className="block font-medium">
            Imagen {editandoId ? '(opcional)' : <span className="text-red-500">*</span>}
          </label>
          <input
            id="file"
            title="Subir imagen"
            type="file"
            accept="image/*"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFile(e.target.files?.[0] || null)
            }
            className="mt-1"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editandoId ? 'Actualizar' : 'Subir'}
          </button>
          {editandoId && (
            <button
              type="button"
              onClick={limpiarFormulario}
              className="text-gray-600 hover:underline"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Lista de Imágenes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {imagenes.map((img) => (
          <div key={img.id} className="bg-white p-4 shadow rounded">
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${img.url}`}
              alt={img.titulo || 'Imagen del carrusel'}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold">
              {img.titulo || 'Sin título'}
            </h3>
            <p className="text-sm text-gray-600">
              {img.descripcion || 'Sin descripción'}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => handleEdit(img)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(img.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Imagenes;
