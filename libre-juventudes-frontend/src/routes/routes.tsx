import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

// Layout principal (público)
import MainLayout from '../layouts/MainLayout';

// Páginas públicas
import Home from '../pages/Home/Home';
import Noticias from '../pages/Noticias/Noticias';
import Agenda from '../pages/Agenda/Agenda';
import Afiliate from '../pages/Afiliate/Afiliate';
import Conocenos from '../pages/Conocenos/Conocenos';

// Páginas sin layout
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

// Página de usuario autenticado
import Perfil from '../pages/Perfil/Perfil';

// Layout administrativo y sus páginas
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard';
import Usuarios from '../pages/Admin/Usuarios';
import Publicaciones from '../pages/Admin/Publicaciones';
import Imagenes from '../pages/Admin/Imagenes';
import AgendaAdmin from '../pages/Admin/Agenda';
import NoticiasAdmin from '../pages/Admin/Noticias';

// Componente para 404
const NotFound = () => (
  <div className="flex justify-center items-center min-h-screen bg-white">
    <h1 className="text-3xl font-bold text-red-600">404 - Página no encontrada</h1>
  </div>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center p-10">Cargando...</div>}>
        <Routes>

          {/* 🌐 Rutas públicas con layout común */}
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

          {/* 👤 Página de perfil de usuario (puedes protegerla con auth si es necesario) */}
          <Route path="/perfil" element={<Perfil />} />

          {/* 🛠️ Rutas privadas con layout de administrador */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="publicaciones" element={<Publicaciones />} />
            <Route path="imagenes" element={<Imagenes />} />
            <Route path="agenda" element={<AgendaAdmin />} />
            <Route path="noticias" element={<NoticiasAdmin />} />
          </Route>

          {/* 🚫 Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
