import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// 사장님이 가져온 '진짜' 설정값입니다!
const firebaseConfig = {
  apiKey: "AIzaSyB6uzHB9wfZSLAE_dDXH4eT-JiCfB1o2O4",
  authDomain: "mapletem214.firebaseapp.com",
  projectId: "mapletem214",
  storageBucket: "mapletem214.firebasestorage.app",
  messagingSenderId: "172990231097",
  appId: "1:172990231097:web:266bc8baa299280f3593e8",
  measurementId: "G-HEWSR2MDQB"
};

// ⚠️ Next.js에서 앱이 두 번 켜지는 것을 막아주는 안전장치
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 우리가 쓸 도구들을 미리 꺼내놓습니다.
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // ✅ 로그인 기능 장착 완료!

// 다른 파일에서 쓸 수 있게 내보냅니다.
export { db, storage, auth };