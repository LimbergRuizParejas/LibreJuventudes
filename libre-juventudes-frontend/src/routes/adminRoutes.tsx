import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

// Páginas del panel de administración
import Dashboard from '../pages/Admin/Dashboard';
import Usuarios from '../pages/Admin/Usuarios';
import Publicaciones from '../pages/Admin/Publicaciones';
import Imagenes from '../pages/Admin/Imagenes';
import Agenda from '../pages/Admin/Agenda';
import Noticias from '../pages/Admin/Noticias';

// 👉 (Opcional): Middleware de protección de rutas si deseas autenticar
// import RequireAdminAuth from '../guards/RequireAdminAuth'; 

// 📁 Rutas privadas del panel administrativo
const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    {/* Ruta base: Panel de control */}
    <Route index element={<Dashboard />} />

    {/* CRUD de entidades administrativas */}
    <Route path="usuarios" element={<Usuarios />} />
    <Route path="publicaciones" element={<Publicaciones />} />
    <Route path="imagenes" element={<Imagenes />} />
    <Route path="agenda" element={<Agenda />} />
    <Route path="noticias" element={<Noticias />} />
  </Route>
);

export default adminRoutes;
