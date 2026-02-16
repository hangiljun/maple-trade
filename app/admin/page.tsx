"use client";
import React, { useState, useEffect } from "react";
import { 
  collection, addDoc, deleteDoc, doc, getDocs, query, orderBy 
} from "firebase/firestore";
import { 
  ref, uploadBytes, getDownloadURL 
} from "firebase/storage";
import { 
  signInWithEmailAndPassword, signOut, onAuthStateChanged, User 
} from "firebase/auth";
import { db, storage, auth } from '../../firebase'; 
import { Trash2, Upload, LogOut, Lock, ShieldAlert, Key, User as UserIcon } from "lucide-react";

// 🔒 [보안 설정] 사장님 아이디
const ADMIN_EMAIL = "6332159@gmail.com"; 

export default function AdminPage() {
  // --- 인증 상태 ---
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- 로그인 입력 상태 (여기가 중요!) ---
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // --- 데이터 상태 ---
  const [activeTab, setActiveTab] = useState("tips"); // tips | news
  const [list, setList] = useState<any[]>([]);
  
  // 글쓰기 폼 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // 1. 로그인 상태 확인 (보안 체크)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.email === ADMIN_EMAIL) {
          setIsAuthorized(true);
          fetchData(activeTab); // 접속 성공시 데이터 로딩
        } else {
          setIsAuthorized(false);
          alert("접근 권한이 없는 계정입니다.");
          signOut(auth);
        }
      } else {
        setUser(null);
        setIsAuthorized(false);
      }
    });
    return () => unsubscribe();
  }, [activeTab]);

  // 2. 로그인 함수 (이메일/비번 방식)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
    } catch (error: any) {
      console.error("로그인 실패:", error);
      alert("아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  // 3. 로그아웃 함수
  const handleLogout = () => {
    signOut(auth);
    setInputEmail("");
    setInputPassword("");
    alert("안전하게 로그아웃 되었습니다.");
  };

  // --- 데이터 가져오기 ---
  const fetchData = async (tab: string) => {
    const collectionName = tab === "tips" ? "tips" : "news";
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if(isAuthorized) fetchData(tab);
  };

  // --- 글 등록 ---
  const handleUpload = async () => {
    if (!title || !content) return alert("제목과 내용을 입력해주세요.");
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

      await addDoc(collection(db, activeTab === "tips" ? "tips" : "news"), {
        title,
        content,
        thumbnail: fileUrl,
        fileType,
        date: new Date().toLocaleDateString(),
        createdAt: new Date()
      });

      alert("등록되었습니다!");
      setTitle(""); setContent(""); setFile(null);
      fetchData(activeTab);
    } catch (e) {
      console.error(e);
      alert("업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  // --- 글 삭제 ---
  const handleDelete = async (id: string) => {
    if(!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deleteDoc(doc(db, activeTab === "tips" ? "tips" : "news", id));
      alert("삭제되었습니다.");
      fetchData(activeTab);
    } catch (e) {
      console.error(e);
      alert("삭제 실패");
    }
  };

  // --- 렌더링: 로딩 중 ---
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">보안 확인 중...</div>;

  // --- 렌더링: 로그인 안 된 상태 (잠금 화면) ---
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-blue-600" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">관리자 로그인</h1>
          <p className="text-gray-500 text-sm mb-6">지정된 관리자 계정으로 접속하세요.</p>
          
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">이메일</label>
              <div className="relative">
                <UserIcon size={18} className="absolute left-3 top-3 text-gray-400"/>
                <input 
                  type="email" 
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="admin@email.com" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">비밀번호</label>
              <div className="relative">
                <Key size={18} className="absolute left-3 top-3 text-gray-400"/>
                <input 
                  type="password" 
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                  required
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition shadow-lg mt-2"
            >
              접속하기
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- 렌더링: 로그인 성공 상태 (관리자 대시보드 - 기존 UI 유지) ---
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
            <ShieldAlert className="text-blue-600"/> 관리자 모드
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 font-bold hidden md:inline">
              {user?.email}님 접속중
            </span>
            <button onClick={handleLogout} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition">
              <LogOut size={16}/> 로그아웃
            </button>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => handleTabChange("tips")} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === "tips" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-500"}`}>
            💡 거래 꿀팁 관리
          </button>
          <button onClick={() => handleTabChange("news")} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === "news" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-500"}`}>
            📰 뉴스/이슈 관리
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 글쓰기 폼 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Upload size={20} /> 새 글 등록
            </h2>
            <div className="space-y-4">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력하세요" className="w-full p-3 border border-gray-300 rounded-lg h-40 resize-none focus:ring-2 focus:ring-blue-500 outline-none"/>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                 <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="hidden" id="file-upload"/>
                 <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-blue-600">
                    <Upload size={24}/>
                    {file ? <span className="text-blue-600 font-bold">{file.name}</span> : "사진/동영상 클릭하여 업로드"}
                 </label>
              </div>
              <button onClick={handleUpload} disabled={uploading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition shadow-md disabled:bg-gray-400">
                {uploading ? "업로드 중..." : "등록하기"}
              </button>
            </div>
          </div>

          {/* 등록된 목록 */}
          <div className="space-y-4">
             <h2 className="text-xl font-bold mb-4">등록된 목록 ({list.length})</h2>
             {list.map((item) => (
               <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center group">
                 <div className="flex-1 truncate pr-4">
                   <h3 className="font-bold text-gray-800 truncate">{item.title}</h3>
                   <p className="text-gray-400 text-sm">{item.date}</p>
                 </div>
                 {item.thumbnail && (
                   <img src={item.thumbnail} alt="thumb" className="w-12 h-12 rounded-lg object-cover bg-gray-100 mr-4 border border-gray-200"/>
                 )}
                 <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition">
                   <Trash2 size={20}/>
                 </button>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}