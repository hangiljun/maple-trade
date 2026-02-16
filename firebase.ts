import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6uzHB9wfZSLAE_dDXH4eT-JiCfB1o2O4",
  authDomain: "mapletem214.firebaseapp.com",
  projectId: "mapletem214",
  storageBucket: "mapletem214.firebasestorage.app",
  messagingSenderId: "172990231097",
  appId: "1:172990231097:web:266bc8baa299280f3593e8",
  measurementId: "G-HEWSR2MDQB",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
