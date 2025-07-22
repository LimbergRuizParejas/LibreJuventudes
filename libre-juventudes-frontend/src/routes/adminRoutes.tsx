import { Route } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';

// Páginas administrativas
import Dashboard from '../pages/Admin/Dashboard';
import Usuarios from '../pages/Admin/Usuarios';
import Publicaciones from '../pages/Admin/Publicaciones';

// Rutas privadas con layout de administración
const adminRoutes = (
  <Route path="/admin" element={<AdminLayout />}>
    <Route index element={<Dashboard />} />
    <Route path="usuarios" element={<Usuarios />} />
    <Route path="publicaciones" element={<Publicaciones />} />
  </Route>
);

export default adminRoutes;
