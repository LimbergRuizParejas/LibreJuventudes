// src/pages/Perfil/Perfil.tsx
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // 🔐 Redirección si no está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleIrAlInicio = () => {
    navigate('/'); // 🔁 Redirección sin recargar, mantiene localStorage
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-100 to-blue-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-sm border-4 border-blue-600 relative overflow-hidden transition-all duration-300">

        {/* Encabezado estilo carta Pokémon */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-red-600 to-blue-600 rounded-b-3xl shadow-inner" />

        <div className="relative z-10 flex flex-col items-center mt-12 space-y-4">
          {/* Imagen del carnet */}
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-md bg-gray-200 overflow-hidden">
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${user.imagen}`}
              alt="Foto de Carnet"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Nombre y bienvenida */}
          <h2 className="text-2xl font-bold text-blue-700 text-center">
            ¡Bienvenido, {user.nombre}!
          </h2>

          {/* Datos del usuario */}
          <div className="text-center text-gray-800 space-y-2">
            <div>
              <p className="font-semibold">📛 Nombre</p>
              <p>{user.nombre}</p>
            </div>
            <div>
              <p className="font-semibold">📧 Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="font-semibold">📍 Ubicación</p>
              <p>{user.ubicacion || 'No especificada'}</p>
            </div>
          </div>

          {/* Mensaje de afiliación */}
          <p className="mt-4 text-lg font-bold text-red-600 text-center">
            🎉 Ya eres parte de Libre
          </p>

          {/* Botón de navegación */}
          <button
            onClick={handleIrAlInicio}
            className="mt-2 bg-gradient-to-r from-red-600 to-blue-600 text-white font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition-transform"
          >
            Ir al Inicio
          </button>
        </div>

        {/* Pie inferior decorativo */}
        <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-red-600 to-blue-600 rounded-t-md" />
      </div>
    </div>
  );
};

export default Perfil;
