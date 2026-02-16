"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { db, storage, auth } from "../../firebase";
import { Trash2, Upload, LogOut, Lock, ShieldAlert } from "lucide-react";

const ADMIN_EMAIL = "6332159@gmail.com";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("tips");
  const [list, setList] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // 🔐 로그인 입력값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔐 인증 체크
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);

      if (currentUser) {
        if (currentUser.email === ADMIN_EMAIL) {
          setUser(currentUser);
          setIsAuthorized(true);
          fetchData(activeTab);
        } else {
          alert("관리자 계정이 아닙니다.");
          signOut(auth);
        }
      } else {
        setUser(null);
        setIsAuthorized(false);
      }
    });

    return () => unsubscribe();
  }, [activeTab]);

  // 🔐 이메일 로그인
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log("로그인 에러:", error.code);
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    alert("로그아웃 되었습니다.");
  };

  const fetchData = async (tab: string) => {
    const collectionName = tab === "tips" ? "tips" : "news";
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (isAuthorized) fetchData(tab);
  };

  const handleUpload = async () => {
    if (!title || !content) return alert("제목과 내용을 입력하세요.");
    if (!isAuthorized) return alert("권한 없음");

    setUploading(true);
    let fileUrl = "";
    let fileType = "image";

    try {
      if (file) {
        const storageRef = ref(storage, `${activeTab}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(storageRef);
        fileType = file.type.startsWith("video") ? "video" : "image";
      }

      await addDoc(collection(db, activeTab), {
        title,
        content,
        thumbnail: fileUrl,
        fileType,
        date: new Date().toLocaleDateString(),
        createdAt: new Date(),
      });

      alert("등록 완료");
      setTitle("");
      setContent("");
      setFile(null);
      fetchData(activeTab);
    } catch (e) {
      console.error(e);
      alert("업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;

    try {
      await deleteDoc(doc(db, activeTab, id));
      alert("삭제 완료");
      fetchData(activeTab);
    } catch (e) {
      console.error(e);
      alert("삭제 실패");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        보안 확인 중...
      </div>
    );

  // 🔐 로그인 화면
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
          <Lock size={40} className="text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-6">관리자 로그인</h1>

          <input
            type="email"
            placeholder="이메일"
            className="w-full p-3 border rounded-lg mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="비밀번호"
            className="w-full p-3 border rounded-lg mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-3 rounded-xl font-bold"
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  // 🔐 관리자 화면
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldAlert /> 관리자 모드
          </h1>
          <button
            onClick={handleLogout}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <LogOut size={16} /> 로그아웃
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button onClick={() => handleTabChange("tips")}>거래 꿀팁</button>
          <button onClick={() => handleTabChange("news")}>뉴스</button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목"
              className="w-full p-3 border mb-3"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용"
              className="w-full p-3 border mb-3"
            />
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mb-3"
            />
            <button
              onClick={handleUpload}
              className="w-full bg-blue-600 text-white py-3 rounded"
            >
              등록
            </button>
          </div>

          <div>
            {list.map((item) => (
              <div key={item.id} className="border p-3 mb-3 flex justify-between">
                <div>{item.title}</div>
                <button onClick={() => handleDelete(item.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
