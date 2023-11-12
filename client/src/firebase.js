// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4826b.firebaseapp.com",
  projectId: "mern-estate-4826b",
  storageBucket: "mern-estate-4826b.appspot.com",
  messagingSenderId: "761310561048",
  appId: "1:761310561048:web:0d0b23acd3e51225f6146d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
