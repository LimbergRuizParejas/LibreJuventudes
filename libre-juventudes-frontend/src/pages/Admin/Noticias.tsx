import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Noticias = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.rol !== 'admin') navigate('/');
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">📰 Gestión de Noticias</h1>
      <p className="text-gray-600">Aquí se mostrarán las noticias publicadas, con título, imagen y descripción.</p>
      {/* 🔜 Aquí va el CRUD de noticias con imagen destacada */}
    </div>
  );
};

export default Noticias;
