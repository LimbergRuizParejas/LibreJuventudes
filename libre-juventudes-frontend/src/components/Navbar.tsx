import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/LogoLibre.jpg';

const Navbar = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { label: 'INICIO', path: '/' },
    { label: 'NOTICIAS', path: '/noticias' },
    { label: 'AGENDA', path: '/agenda' },
    { label: 'MI AFILIACIÓN', path: '/afiliate' },
    { label: 'CONÓCENOS', path: '/conocenos' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3 flex-wrap gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo Libre Juventudes"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Navegación */}
        <ul className="flex flex-wrap gap-6">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`transition font-medium hover:text-blue-700 ${
                  location.pathname === item.path
                    ? 'text-blue-700 underline'
                    : 'text-gray-800'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Acciones autenticación */}
        <div className="flex flex-wrap gap-4 items-center">
          {isAuthenticated && user ? (
            <>
              <span className="text-sm font-semibold text-gray-700">
                👋 {user.nombre}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  INICIA SESIÓN COMO LIBRE
                </button>
              </Link>
              <Link to="/register">
                <button
                  type="button"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  FORMA PARTE
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
