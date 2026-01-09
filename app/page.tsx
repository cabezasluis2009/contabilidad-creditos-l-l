"use client";
import { useState, useEffect } from 'react';
import FileUpload from '../components/FileUpload';
import Auth from '../components/Auth';
import { auth } from '../src/firebase';
import { onAuthStateChanged, User } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <p className="text-gray-500">Cargando...</p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className='text-center mb-8'>
            <h1 className="text-3xl font-bold text-gray-800">
              Plataforma de Archivos
            </h1>
            <p className='text-gray-500 mt-2'>Por favor, inicia sesión para continuar</p>
          </div>
          
          <Auth />

          {user && (
            <div className='mt-8 pt-8 border-t border-gray-200'>
              <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Subir Imagen</h2>
              <p className="text-center text-gray-500 mb-6">
                Selecciona una imagen y haz clic en "Subir Archivo".
              </p>
              <FileUpload />
            </div>
          )}

        </div>
        <p className="text-center text-xs text-gray-400 mt-8">
          Desarrollado con Firebase y Next.js
        </p>
      </div>
    </main>
  );
}
