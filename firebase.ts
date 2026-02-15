// 1. Storage(창고) 기능 가져오기 (이 줄이 추가됨)
import { getStorage } from "firebase/storage"; 
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // ⚠️ [중요] 아래 값들은 사장님의 원래 firebase.ts에 적힌 그대로 쓰세요!
  apiKey: "사장님의_원래_API_KEY",
  authDomain: "mapletem214.firebaseapp.com",
  projectId: "mapletem214",
  
  // 👇 [핵심] 이 줄을 꼭 추가해야 합니다! (아까 만든 창고 주소)
  storageBucket: "mapletem214.firebasestorage.app", 
  
  messagingSenderId: "사장님의_SENDER_ID",
  appId: "사장님의_APP_ID"
};

// 파이어베이스 초기화
const app = initializeApp(firebaseConfig);

// 2. 장부(DB) 연결
const db = getFirestore(app);

// 3. 창고(Storage) 연결 (이 줄이 추가됨)
const storage = getStorage(app); 

// 4. 밖에서 쓸 수 있게 내보내기 (storage 추가됨)
export { db, storage };