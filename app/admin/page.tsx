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

// 🔒 [보안 설정] 사장님만 접속 가능한 이메일 (이거 아니면 강제 로그아웃됨)
const ADMIN_EMAIL = "6332159@gmail.com"; 

export default function AdminPage() {
  // --- 인증 상태 ---
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- 로그인 입력창 상태 ---
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // --- 데이터 상태 ---
  const [activeTab, setActiveTab] = useState("tips"); 
  const [list, setList] = useState<any[]>([]);
  
  // 글쓰기 입력 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // 1. 로그인 상태 확인 (새로고침 해도 유지됨)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        // 로그인 된 상태라면?
        if (currentUser.email === ADMIN_EMAIL) {
          setUser(currentUser);
          setIsAuthorized(true);
          fetchData(activeTab); // 데이터 불러오기
        } else {
          alert("관리자 권한이 없는 계정입니다.");
          signOut(auth);
          setIsAuthorized(false);
        }
      } else {
        // 로그아웃 상태라면?
        setUser(null);
        setIsAuthorized(false);
      }
    });
    return () => unsubscribe();
  }, [activeTab]);

  // 2. 로그인 버튼 클릭 시 실행
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지
    try {
      // 🚀 여기서 파이어베이스로 아이디/비번을 보내서 확인합니다.
      await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
      // 성공하면 위 useEffect에서 자동으로 감지해서 로그인 시켜줍니다.
    } catch (error: any) {
      console.error("로그인 실패:", error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      } else if (error.code === 'auth/too-many-requests') {
        alert("너무 많이 틀렸습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert("로그인 오류: " + error.code);
      }
    }
  };

  // 3. 로그아웃
  const handleLogout = () => {
    signOut(auth);
    alert("안전하게 로그아웃 되었습니다.");
    setInputEmail("");
    setInputPassword("");
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
        title, content, thumbnail: fileUrl, fileType,
        date: new Date().toLocaleDateString(), createdAt: new Date()
      });
      alert("등록 완료!");
      setTitle(""); setContent(""); setFile(null);
      fetchData(activeTab);
    } catch (e) { alert("업로드 실패"); } 
    finally { setUploading(false); }
  };

  // --- 글 삭제 ---
  const handleDelete = async (id: string) => {
    if(!confirm("삭제하시겠습니까?")) return;
    try {
      await deleteDoc(doc(db, activeTab === "tips" ? "tips" : "news", id));
      alert("삭제됨");
      fetchData(activeTab);
    } catch (e) { alert("삭제 실패"); }
  };

  // --- 화면 1: 로딩 중 ---
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white font-bold">보안 확인 중...</div>;

  // --- 화면 2: 로그인 창 (잠금 화면) ---
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

  // --- 화면 3: 관리자 대시보드 (접속 성공!) ---
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
            <ShieldAlert className="text-blue-600"/> 관리자 모드
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 font-bold hidden md:inline">{user?.email}</span>
            <button onClick={handleLogout} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition">
              <LogOut size={16}/> 로그아웃
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button onClick={() => handleTabChange("tips")} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === "tips" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-100"}`}>💡 거래 꿀팁</button>
          <button onClick={() => handleTabChange("news")} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === "news" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-100"}`}>📰 뉴스/이슈</button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 글쓰기 폼 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Upload size={20} className="text-blue-600"/> 글 등록</h2>
            <div className="space-y-4">
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력하세요" className="w-full p-3 border border-gray-300 rounded-lg h-40 resize-none focus:ring-2 focus:ring-blue-500 outline-none"/>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition">
                 <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="hidden" id="file"/>
                 <label htmlFor="file" className="cursor-pointer text-gray-500 hover:text-blue-600 flex flex-col items-center gap-2">
                   <Upload size={24}/> 
                   <span className="font-bold">{file ? file.name : "사진/동영상 업로드"}</span>
                 </label>
              </div>
              <button onClick={handleUpload} disabled={uploading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition shadow-md disabled:bg-gray-400">
                {uploading ? "업로드 중..." : "등록하기"}
              </button>
            </div>
          </div>
          {/* 목록 */}
          <div className="space-y-4">
             <h2 className="text-xl font-bold mb-4">등록된 목록 ({list.length})</h2>
             {list.map((item) => (
               <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition">
                 <div className="flex-1 truncate pr-4">
                   <h3 className="font-bold text-gray-800 truncate">{item.title}</h3>
                   <p className="text-gray-400 text-sm">{item.date}</p>
                 </div>
                 {item.thumbnail && <img src={item.thumbnail} className="w-12 h-12 rounded-lg object-cover bg-gray-100 mr-4 border border-gray-200"/>}
                 <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition"><Trash2 size={20}/></button>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}