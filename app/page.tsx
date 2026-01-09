'use client';

import { useAuth } from '../context/AuthContext';
import { auth } from '../src/firebase';
import { signOut } from 'firebase/auth';
import Login from '../components/Login';
import CreditForm from '../components/CreditForm';

export default function HomePage() {
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h1 className="text-2xl">Cargando...</h1>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
       <header className="bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">CRÉDITOS L&L</h1>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
        >
          Cerrar Sesión
        </button>
      </header>
      <main>
        <CreditForm />
      </main>
    </div>
  );
}
