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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !clientName || !creditAmount) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const storageRef = ref(storage, `credit-proofs/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytesResumable(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await addDoc(collection(firestore, "credits"), {
        clientName,
        creditAmount: parseFloat(creditAmount),
        imageUrl: downloadURL,
        createdAt: new Date(),
      });

      setSuccessMessage('¡Crédito registrado con éxito!');
      setClientName('');
      setCreditAmount('');
      setFile(null);
    } catch (err) {
      setError('Error al guardar el crédito. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 flex justify-center p-4">
        <div className="w-full max-w-lg p-8 space-y-6 bg-gray-800 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold text-white text-center">Registrar Nuevo Crédito</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="clientName" className="block text-sm font-medium mb-1 text-gray-400">Nombre del Cliente</label>
                    <input
                        id="clientName"
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        required
                        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: Juan Pérez"
                    />
                </div>

                <div>
                    <label htmlFor="creditAmount" className="block text-sm font-medium mb-1 text-gray-400">Monto del Crédito</label>
                    <input
                        id="creditAmount"
                        type="number"
                        value={creditAmount}
                        onChange={(e) => setCreditAmount(e.target.value)}
                        required
                        className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Ej: 500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-400">Comprobante (Imagen)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-400">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-blue-500 px-2">
                                    <span>Sube un archivo</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                </label>
                                <p className="pl-1">o arrástralo y suéltalo</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
                        </div>
                    </div>
                    {file && <p className="text-sm text-green-400 mt-2">Archivo seleccionado: {file.name}</p>}
                </div>

                 {error && <p className="text-center text-red-400 text-sm">{error}</p>}
                {successMessage && <p className="text-center text-green-400 text-sm">{successMessage}</p>}

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 px-4 py-2.5 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 disabled:opacity-60"
                    >
                        {isSubmitting ? 'Guardando...' : 'Guardar Crédito'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}
