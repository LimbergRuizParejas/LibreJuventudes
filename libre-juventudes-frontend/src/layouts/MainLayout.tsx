import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 min-h-screen bg-gray-50">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
