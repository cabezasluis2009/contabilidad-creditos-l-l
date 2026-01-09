'use client';

import { useState } from 'react';
import { storage, firestore } from '../src/firebase';
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
      const storageRef = ref(storage, `credit-proofs/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(firestore, "credits"), {
        clientName: clientName,
        creditAmount: parseFloat(creditAmount),
        imageUrl: downloadURL,
        createdAt: new Date(),
      });

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
    <div className="bg-white text-black flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-center">Registrar Nuevo Crédito</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
            <input
              id="clientName"
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div>
            <label htmlFor="creditAmount" className="block text-sm font-medium text-gray-700">Monto del Crédito</label>
            <input
              id="creditAmount"
              type="number"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
              placeholder="Ej: 500"
            />
          </div>

          <div>
             <label htmlFor="fileUpload" className="block text-sm font-medium text-gray-700">Comprobante (Imagen)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-gray-700 hover:text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-500">
                    <span>Sube un archivo</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                  </label>
                  <p className="pl-1">o arrástralo aquí</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                {file && <p className="text-sm text-green-600 mt-2">Archivo seleccionado: {file.name}</p>}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Crédito'}
            </button>
          </div>
        </form>
        
        {error && <p className="mt-4 text-center text-red-600 text-sm">Error: {error}</p>}
        {successMessage && <p className="mt-4 text-center text-green-600 text-sm">{successMessage}</p>}

      </div>
    </div>
  );
}
