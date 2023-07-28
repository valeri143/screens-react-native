// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDN2hdO1qrfRZLhEOcBFZ10Q8NGMsC-isE",
  authDomain: "appscr-3d96b.firebaseapp.com",
  projectId: "appscr-3d96b",
  storageBucket: "appscr-3d96b.appspot.com",
  messagingSenderId: "847209474100",
  appId: "1:847209474100:web:c4dfacc7fc618ebc490261",
  measurementId: "G-TLETW1JX57"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);