import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlJ1GJYotrwW2rtjPCxXoUSybnkixO2J8",
  authDomain: "contabilidad-db02e.firebaseapp.com",
  projectId: "contabilidad-db02e",
  storageBucket: "contabilidad-db02e",
  messagingSenderId: "433674619524",
  appId: "1:433674619524:web:cab7f151c096ebab0510d1"
};

// Initialize Firebase App only if it doesn't exist
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export services
export const storage = getStorage(app);
export const auth = getAuth(app);
