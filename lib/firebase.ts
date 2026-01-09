
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// La configuración de tu app de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBlJ1GJYotrwW2rtjPCxXoUSybnkixO2J8",
  authDomain: "contabilidad-db02e.firebaseapp.com",
  projectId: "contabilidad-db02e",
  storageBucket: "contabilidad-db02e.appspot.com",
  messagingSenderId: "433674619524",
  appId: "1:433674619524:web:cab7f151c096ebab0510d1",
  measurementId: "G-H0BEY91F51"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener una referencia al servicio de Storage
export const storage = getStorage(app);
