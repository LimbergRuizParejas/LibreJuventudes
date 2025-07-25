import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Afiliate = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-100 to-blue-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm border-4 border-blue-500 relative overflow-hidden">
        
        {/* Encabezado de color rojo y azul (Libre) */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-red-600 to-blue-600 rounded-b-3xl shadow-inner" />

        <div className="relative z-10 flex flex-col items-center mt-10 space-y-4">
          {/* Imagen tipo carta Pokémon */}
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 overflow-hidden">
            <img
              src={`${import.meta.env.VITE_API_URL}/uploads/${user.imagen}`}
              alt="Foto de Carnet"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <h2 className="text-xl font-bold text-blue-700 text-center">
            ¡Bienvenido, {user.nombre}!
          </h2>

          <div className="text-center text-gray-700 space-y-2">
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

          <p className="mt-4 text-lg font-bold text-red-600 text-center">
            🗳️ ¡Gracias por afiliarte a Libre Juventudes!
          </p>
        </div>

        {/* Pie de color decorativo */}
        <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-red-600 to-blue-600 rounded-t-md" />
      </div>
    </div>
  );
};

export default Afiliate;
