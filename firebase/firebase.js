import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOfl4E6npYRUavp36VJoWmA-lQdXziW6U",

  authDomain: "examprep-4cf05.firebaseapp.com",

  projectId: "examprep-4cf05",

  storageBucket: "examprep-4cf05.firebasestorage.app",

  messagingSenderId: "799031910275",

  appId: "1:799031910275:web:93c87a52f4dd00bc60e0b6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };