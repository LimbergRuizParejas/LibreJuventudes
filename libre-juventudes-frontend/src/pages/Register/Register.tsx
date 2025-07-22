import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth(); // register espera un solo argumento: FormData

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('ubicacion', ubicacion);
      if (imagen) formData.append('imagen', imagen);

      await register(formData); // Función register debe aceptar FormData
      navigate('/');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al registrarse';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-white px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md space-y-6"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-red-700">Crea tu cuenta en Libre</h2>

        {error && <div className="text-red-600 text-sm text-center">{error}</div>}

        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
            Nombre completo
          </label>
          <input
            id="nombre"
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500"
          />
        </div>

        <div>
          <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">
            ¿Dónde vives?
          </label>
          <input
            id="ubicacion"
            type="text"
            required
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-red-500"
          />
        </div>

        <div>
          <label htmlFor="imagen" className="block text-sm font-medium text-gray-700">
            Foto de perfil
          </label>
          <input
            id="imagen"
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files?.[0] || null)}
            className="mt-1 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white font-semibold rounded ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <p className="text-sm text-center text-gray-500">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="text-red-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
