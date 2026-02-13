// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6uzHB9wfZSLAE_dDXH4eT-JiCfB1o2O4",
  authDomain: "mapletem214.firebaseapp.com",
  projectId: "mapletem214",
  storageBucket: "mapletem214.firebasestorage.app",
  messagingSenderId: "172990231097",
  appId: "1:172990231097:web:266bc8baa299280f3593e8",
  measurementId: "G-HEWSR2MDQB"
};

// 여기서 에러가 많이 납니다. "이미 켜져있으면 켜진 거 쓰고, 아니면 새로 켜라"는 코드입니다.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 데이터베이스 도구를 내보냅니다.
export const db = getFirestore(app);