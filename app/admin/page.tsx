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
import { Trash2, Upload, LogOut, Lock, ShieldAlert, Key, User as UserIcon, MessageCircle } from "lucide-react";

// 🔒 [보안 설정] 사장님 아이디
const ADMIN_EMAIL = "6332159@gmail.com"; 

export default function AdminPage() {
  // --- 인증 상태 ---
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- 로그인 입력 상태 ---
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // --- 데이터 상태 ---
  // ✅ 탭에 'reviews' 추가
  const [activeTab, setActiveTab] = useState("tips"); // tips | news | reviews
  const [list, setList] = useState<any[]>([]);
  
  // 글쓰기 폼 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // 1. 로그인 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.email === ADMIN_EMAIL) {
          setIsAuthorized(true);
          fetchData(activeTab); 
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

  // 2. 로그인 함수
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

  // --- 데이터 가져오기 (이용후기 포함) ---
  const fetchData = async (tab: string) => {
    // ✅ 탭 이름에 따라 가져올 컬렉션 이름 결정
    let collectionName = "tips";
    if (tab === "news") collectionName = "news";
    if (tab === "reviews") collectionName = "reviews";

    try {
      const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      setList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if(isAuthorized) fetchData(tab);
  };

  // --- 글 등록 (꿀팁/뉴스만 가능) ---
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

      await addDoc(collection(db, activeTab), {
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
    if(!confirm("정말 삭제하시겠습니까? (복구 불가)")) return;
    try {
      // ✅ 현재 탭에 맞는 컬렉션에서 삭제
      let collectionName = activeTab; 
      await deleteDoc(doc(db, collectionName, id));
      alert("삭제되었습니다.");
      fetchData(activeTab);
    } catch (e) {
      console.error(e);
      alert("삭제 실패");
    }
  };

  // --- 렌더링: 로딩 중 ---
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">보안 확인 중...</div>;

  // --- 렌더링: 로그인 안 된 상태 ---
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

  // --- 렌더링: 관리자 대시보드 ---
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

        {/* 탭 메뉴: 이용후기 추가됨 */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={() => handleTabChange("tips")} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === "tips" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-500"}`}>
            💡 거래 꿀팁
          </button>
          <button onClick={() => handleTabChange("news")} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === "news" ? "bg-blue-600 text-white shadow-lg" : "bg-white text-gray-500"}`}>
            📰 뉴스/이슈
          </button>
          <button onClick={() => handleTabChange("reviews")} className={`px-6 py-3 rounded-xl font-bold transition ${activeTab === "reviews" ? "bg-indigo-600 text-white shadow-lg" : "bg-white text-gray-500"}`}>
            💬 이용후기 관리
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* 왼쪽: 글쓰기 폼 (이용후기 탭에서는 숨김) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 h-fit">
            {activeTab === 'reviews' ? (
              <div className="text-center py-10">
                <MessageCircle size={48} className="mx-auto text-indigo-200 mb-4"/>
                <h3 className="text-xl font-bold text-gray-800 mb-2">이용후기 관리</h3>
                <p className="text-gray-500">
                  이용후기는 유저들이 작성하는 공간입니다.<br/>
                  관리자님은 여기서 <span className="text-red-500 font-bold">삭제(관리)</span>만 가능합니다.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Upload size={20} /> 새 글 등록 ({activeTab === 'tips' ? '꿀팁' : '뉴스'})
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
              </>
            )}
          </div>

          {/* 오른쪽: 등록된 목록 (삭제 기능) */}
          <div className="space-y-4">
             <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
               <span>
                 {activeTab === 'reviews' ? '💬 등록된 후기' : '📋 등록된 글'} ({list.length})
               </span>
               <span className="text-xs font-normal text-gray-400">최신순 정렬</span>
             </h2>
             
             {list.length === 0 ? (
               <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-xl border border-dashed">
                 등록된 데이터가 없습니다.
               </div>
             ) : (
               list.map((item) => (
                 <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center group hover:border-blue-300 transition">
                   <div className="flex-1 truncate pr-4">
                     <div className="flex items-center gap-2 mb-1">
                       {/* 이용후기일 때 서버 뱃지 표시 */}
                       {activeTab === 'reviews' && item.server && (
                         <span className="bg-indigo-50 text-indigo-600 text-[10px] px-1.5 py-0.5 rounded font-bold border border-indigo-100">
                           {item.server}
                         </span>
                       )}
                       <h3 className="font-bold text-gray-800 truncate text-sm md:text-base">{item.title}</h3>
                     </div>
                     <div className="text-xs text-gray-400 flex gap-2">
                       <span>{item.date}</span>
                       {/* 이용후기일 때 작성자 표시 */}
                       {activeTab === 'reviews' && item.author && (
                         <>
                           <span className="text-gray-300">|</span>
                           <span>{item.author}</span>
                         </>
                       )}
                     </div>
                   </div>
                   
                   {/* 썸네일 (꿀팁/뉴스) */}
                   {item.thumbnail && (
                     <img src={item.thumbnail} alt="thumb" className="w-10 h-10 rounded-lg object-cover bg-gray-100 mr-3 border border-gray-200"/>
                   )}
                   
                   <button 
                     onClick={() => handleDelete(item.id)}
                     className="text-gray-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition"
                     title="삭제하기"
                   >
                     <Trash2 size={18}/>
                   </button>
                 </div>
               ))
             )}
          </div>
        </div>
      </div>
    </div>
  );
}