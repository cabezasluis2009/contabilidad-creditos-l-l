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
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <h1 className="text-2xl">Cargando...</h1>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-white">
       <header className="bg-white text-black p-4 flex justify-between items-center border-b border-gray-200">
        <h1 className="text-xl font-semibold">CRÉDITOS L&L</h1>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 font-semibold text-red-600 bg-transparent border border-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cerrar Sesión
        </button>
      </header>
      <main className="p-4">
        <CreditForm />
      </main>
    </div>
  );
}
