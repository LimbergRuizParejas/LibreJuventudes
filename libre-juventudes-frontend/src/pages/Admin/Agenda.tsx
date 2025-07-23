import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Agenda = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user?.rol !== 'admin') navigate('/');
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">📅 Agenda de Eventos</h1>
      <p className="text-gray-600">Aquí podrás gestionar los eventos futuros de Libre Juventudes.</p>
      {/* 🔜 Aquí va el CRUD de eventos */}
    </div>
  );
};

export default Agenda;
