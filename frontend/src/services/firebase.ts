import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "auth-swapi.firebaseapp.com",
  projectId: "auth-swapi",
  storageBucket: "auth-swapi.appspot.com",
  messagingSenderId: "887833796273",
  appId: "1:887833796273:web:4a8eed1753f9f4bf418c90",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
