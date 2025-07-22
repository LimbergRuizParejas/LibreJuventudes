import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout principal público
import MainLayout from '../layouts/MainLayout';

// Páginas públicas con layout
import Home from '../pages/Home/Home';
import Noticias from '../pages/Noticias/Noticias';
import Agenda from '../pages/Agenda/Agenda';
import Afiliate from '../pages/Afiliate/Afiliate';
import Conocenos from '../pages/Conocenos/Conocenos';

// Páginas públicas sin layout
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

// Layout y páginas administrativas (privadas)
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard';
import Usuarios from '../pages/Admin/Usuarios';
import Publicaciones from '../pages/Admin/Publicaciones';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Rutas públicas con layout principal */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/afiliate" element={<Afiliate />} />
          <Route path="/conocenos" element={<Conocenos />} />
        </Route>

        {/* 🔐 Rutas de autenticación (sin layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🛠️ Rutas administrativas (privadas) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="publicaciones" element={<Publicaciones />} />
        </Route>

        {/* 🚫 Ruta 404 */}
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center min-h-screen bg-white">
              <h1 className="text-3xl font-bold text-red-600">404 - Página no encontrada</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
