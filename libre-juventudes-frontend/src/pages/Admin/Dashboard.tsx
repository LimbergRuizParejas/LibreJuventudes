import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.rol === 'admin';

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Panel de Administración
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Bienvenido, {user?.email}
          </h2>
          <p className="text-gray-600">
            Aquí puedes gestionar usuarios, publicaciones, eventos, imágenes y más.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-2 text-blue-700">Acciones rápidas</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Ver estadísticas</li>
            <li>Administrar publicaciones</li>
            <li>Administrar imágenes</li>
            <li>Administrar usuarios</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
