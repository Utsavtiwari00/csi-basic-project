import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: "examprep-4cf05",
  storageBucket: "examprep-4cf05.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 export{app,auth};
