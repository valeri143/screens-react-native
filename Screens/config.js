// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA0ABkYAOaH9-16ZifNIWghH9Q5BxyFc3w",
    authDomain: "screens-eb8d9.firebaseapp.com",
    databaseURL: "https://screens-eb8d9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "screens-eb8d9",
    storageBucket: "screens-eb8d9.appspot.com",
    messagingSenderId: "148883041402",
    appId: "1:148883041402:web:9339234513eebc2301dfc3",
    measurementId: "G-7TJVY60936"
  };
  
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);