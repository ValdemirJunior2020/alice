// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBukTsxc-G0qy7vilev7EJglMqK3aEL3gQ",
  authDomain: "medium-3ae06.firebaseapp.com",
  projectId: "medium-3ae06",
  storageBucket: "medium-3ae06.firebasestorage.app", // ✅ CORRIGIDO AQUI
  messagingSenderId: "913524518327",
  appId: "1:913524518327:web:56175bbffb534522b1cc32",
  measurementId: "G-LXEYYW65VZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
