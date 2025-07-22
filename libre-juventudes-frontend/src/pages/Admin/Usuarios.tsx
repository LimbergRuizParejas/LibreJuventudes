import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getUsuarios, updateUserRole } from '../../services/api';
import { Usuario } from '../../types/user';

const Usuarios = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || user?.rol !== 'admin') {
      navigate('/');
      return;
    }

    const cargarUsuarios = async () => {
      try {
        const data = await getUsuarios();
        setUsuarios(data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar usuarios');
      }
    };

    cargarUsuarios();
  }, [isAuthenticated, user, navigate]);

  const cambiarRol = async (id: number, nuevoRol: 'usuario' | 'admin') => {
    try {
      await updateUserRole(id, nuevoRol);
      setUsuarios((prev) =>
        prev.map((u) => (u.id === id ? { ...u, rol: nuevoRol } : u))
      );
    } catch (err) {
      console.error(err);
      setError('Error al cambiar rol');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">Gestión de Usuarios</h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {usuarios.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow-md">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Correo</th>
                <th className="px-4 py-2 text-left">Rol</th>
                <th className="px-4 py-2 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{u.nombre}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2 capitalize">{u.rol}</td>
                  <td className="px-4 py-2 space-x-2">
                    {u.rol === 'usuario' ? (
                      <button
                        onClick={() => cambiarRol(u.id, 'admin')}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Hacer Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => cambiarRol(u.id, 'usuario')}
                        className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
                      >
                        Hacer Usuario
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-4">No hay usuarios registrados.</p>
      )}
    </div>
  );
};

export default Usuarios;
