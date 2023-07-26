// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDf4LYi6rNmF1tmZsam6T3GWobg1CHk09o",
  authDomain: "appscreen-7e66a.firebaseapp.com",
  projectId: "appscreen-7e66a",
  storageBucket: "appscreen-7e66a.appspot.com",
  messagingSenderId: "845359526313",
  appId: "1:845359526313:web:41aa3df48439bd4bd554b8",
  measurementId: "G-G8SVFQYPY0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);