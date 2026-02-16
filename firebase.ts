import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "실제_API_KEY",
  authDomain: "mapletem214.firebaseapp.com",
  projectId: "mapletem214",
  storageBucket: "mapletem214.firebasestorage.app",
  messagingSenderId: "실제_SENDER_ID",
  appId: "실제_APP_ID"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);   // ✅ 이 줄 추가 (핵심)

export { db, storage, auth }; // ✅ auth도 export
