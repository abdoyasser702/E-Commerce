import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore

const firebaseConfig = {
  apiKey: "AIzaSyBVLInR54hJ1xaGJTj_fbuVpRwCKIOzRhA",
  authDomain: "e-commerce-a725d.firebaseapp.com",
  projectId: "e-commerce-a725d",
  storageBucket: "e-commerce-a725d.appspot.com",
  messagingSenderId: "701655711446",
  appId: "1:701655711446:web:d3fb81802b958499265377",
  measurementId: "G-JSVSEKG78R",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
