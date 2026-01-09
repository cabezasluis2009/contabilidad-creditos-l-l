'use client';

import { useState } from 'react';
import { storage, firestore } from '../src/firebase'; // Asegúrate que firestore esté exportado en tu archivo firebase.js
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 

export default function CreditForm() {
  const [clientName, setClientName] = useState('');
  const [creditAmount, setCreditAmount] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setSuccessMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !clientName || !creditAmount) {
      setError('Por favor, completa todos los campos y selecciona un archivo.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      // 1. Subir la imagen a Firebase Storage
      const storageRef = ref(storage, `credit-proofs/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);

      // 2. Guardar los datos en Firestore
      await addDoc(collection(firestore, "credits"), {
        clientName: clientName,
        creditAmount: parseFloat(creditAmount),
        imageUrl: downloadURL,
        createdAt: new Date(),
      });

      // 3. Limpiar formulario y mostrar mensaje de éxito
      setSuccessMessage('¡Crédito registrado con éxito!');
      setClientName('');
      setCreditAmount('');
      setFile(null);

    } catch (err: any) {
      setError(`Error al registrar el crédito: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center">Registrar Nuevo Crédito</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="clientName" className="text-sm font-semibold">Nombre del Cliente</label>
            <input
              id="clientName"
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div>
            <label htmlFor="creditAmount" className="text-sm font-semibold">Monto del Crédito</label>
            <input
              id="creditAmount"
              type="number"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ej: 500"
            />
          </div>

          <div>
            <label htmlFor="fileUpload" className="text-sm font-semibold">Comprobante (Imagen)</label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-400">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-blue-500">
                    <span>Sube un archivo</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                  </label>
                  <p className="pl-1">o arrástralo aquí</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                {file && <p className="text-sm text-green-400 mt-2">Archivo seleccionado: {file.name}</p>}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Crédito'}
            </button>
          </div>
        </form>
        
        {error && <p className="mt-4 text-center text-red-400">Error: {error}</p>}
        {successMessage && <p className="mt-4 text-center text-green-400">{successMessage}</p>}

      </div>
    </div>
  );
}
