import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminLayout = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Si no está autenticado o no es admin, redirigir al home
    if (!isAuthenticated || !user || user.rol !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar de navegación */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">⚙️ Admin Libre</h2>
        <nav className="space-y-3">
          <Link
            to="/admin"
            className="block hover:text-blue-300 transition duration-200"
          >
            📊 Dashboard
          </Link>
          <Link
            to="/admin/usuarios"
            className="block hover:text-blue-300 transition duration-200"
          >
            👥 Usuarios
          </Link>
          <Link
            to="/admin/publicaciones"
            className="block hover:text-blue-300 transition duration-200"
          >
            📝 Publicaciones
          </Link>
        </nav>
      </aside>

      {/* Contenido principal del panel admin */}
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
