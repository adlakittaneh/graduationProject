import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail, // اضفنا الدالة هنا
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLfVbyK7avDL3IGz4AkNHUR1VUnzsI6y8",
  authDomain: "aqarapp-ffd81.firebaseapp.com",
  projectId: "aqarapp-ffd81",
  storageBucket: "aqarapp-ffd81.firebasestorage.app",
  messagingSenderId: "286129190903",
  appId: "1:286129190903:web:6264a37c27ba301da3a0f2",
  measurementId: "G-DY2T2RL7D9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export { signInWithPopup, sendPasswordResetEmail }; // صدرناها لاستخدامها في أي ملف
