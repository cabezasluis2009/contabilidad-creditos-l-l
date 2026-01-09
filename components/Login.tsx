'use client';

import { useState } from 'react';
import { auth } from '../src/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex items-center justify-center p-4">
      <div className="w-full max-w-sm p-8 space-y-4 bg-gray-800 rounded-2xl shadow-lg">
        
        <div className="flex flex-col items-center space-y-2">
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mb-2 shadow-md">
                <span className="text-3xl font-bold text-white">L&L</span>
            </div>
          <h1 className="text-2xl font-bold text-white">CRÉDITOS L&L</h1>
          <p className="text-sm text-gray-400">Inicia sesión para administrar tu negocio</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-400">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="usuario@dominio.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-400">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-center text-red-400 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 px-4 py-2.5 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-60"
            >
              {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
            </button>
          </div>
        </form>

        <p className="text-xs text-center text-gray-500 pt-2">
          Por favor, usa las credenciales proporcionadas por el administrador.
        </p>

      </div>
    </div>
  );
}
