// src/layouts/AdminLayout.tsx
import { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AdminLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user || user.rol !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar de navegación */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen">
        {/* Parte superior */}
        <div className="flex-grow p-6">
          <h2 className="text-2xl font-bold mb-6">⚙️ Admin Libre</h2>
          <nav className="space-y-4 text-base">
            <Link to="/admin" className="block hover:text-blue-300 transition">
              📊 Dashboard
            </Link>
            <Link to="/admin/usuarios" className="block hover:text-blue-300 transition">
              👥 Usuarios
            </Link>
            <Link to="/admin/publicaciones" className="block hover:text-blue-300 transition">
              📝 Publicaciones
            </Link>
            <Link to="/admin/imagenes" className="block hover:text-blue-300 transition">
              🖼️ Imágenes (Carrusel)
            </Link>
            <Link to="/admin/agenda" className="block hover:text-blue-300 transition">
              📅 Agenda
            </Link>
            <Link to="/admin/noticias" className="block hover:text-blue-300 transition">
              📰 Noticias
            </Link>
          </nav>
        </div>

        {/* Botón cerrar sesión al fondo */}
        <div className="p-6 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm transition"
          >
            🚪 Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-8 bg-gray-100 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
