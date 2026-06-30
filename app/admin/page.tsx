"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  collection, addDoc, deleteDoc, doc, getDocs, query, orderBy, updateDoc, getDoc
} from "firebase/firestore";
import { 
  ref, uploadBytes, getDownloadURL 
} from "firebase/storage";
import { 
  signInWithEmailAndPassword, signOut, onAuthStateChanged, User 
} from "firebase/auth";
import { db, storage, auth } from '../../firebase'; 
import { Trash2, Upload, LogOut, Lock, ShieldAlert, Key, User as UserIcon, MessageCircle, Edit2, X } from "lucide-react";

// 🔒 [보안] 관리자 이메일 설정
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "6332159@gmail.com"; 

export default function AdminPage() {
  // --- 인증 상태 ---
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- 로그인 입력 상태 ---
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // --- 데이터 상태 ---
  const [activeTab, setActiveTab] = useState("tips"); // tips | news | reviews
  const [list, setList] = useState<any[]>([]);
    
  // 글쓰기 폼 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("공지"); // ✅ 카테고리 상태 추가
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // ✅ 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingThumbnail, setExistingThumbnail] = useState<string>("");
  const [existingFileType, setExistingFileType] = useState<string>("");

  // ✅ 데이터 가져오기 함수
  const fetchData = useCallback(async (tab: string) => {
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
  }, []);

  // 1. 로그인 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) {
        setUser(currentUser);
        if (currentUser.email === ADMIN_EMAIL) {
          setIsAuthorized(true);
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
  }, []);

  // 2. 탭 변경 또는 권한 획득 시 데이터 로드
  useEffect(() => {
    if (isAuthorized) {
      fetchData(activeTab);
    }
  }, [activeTab, isAuthorized, fetchData]);

  // 3. 로그인 함수
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
    } catch (error: any) {
      console.error("로그인 실패:", error);
      alert("아이디 또는 비밀번호를 확인해주세요.");
    }
  };

  // 4. 로그아웃 함수
  const handleLogout = () => {
    signOut(auth);
    setInputEmail("");
    setInputPassword("");
    alert("안전하게 로그아웃 되었습니다.");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // 탭 변경 시 입력 폼 초기화
    handleCancelEdit();
  };

  // ✅ 수정 취소 함수
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditingId(null);
    setTitle("");
    setContent("");
    setCategory("공지");
    setFile(null);
    setExistingThumbnail("");
    setExistingFileType("");
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

      await addDoc(collection(db, activeTab), {
        title,
        content,
        category: activeTab === 'news' ? category : null, // ✅ 뉴스일 경우 카테고리 저장
        thumbnail: fileUrl,
        fileType,
        date: new Date().toLocaleDateString('ko-KR'), // 날짜 포맷 통일
        createdAt: new Date()
      });

      alert("등록되었습니다!");
      setTitle(""); setContent(""); setFile(null);
      // 업로드 후 목록 갱신
      fetchData(activeTab);
    } catch (e) {
      console.error(e);
      alert("업로드 실패");
    } finally {
      setUploading(false);
    }
  };

  // ✅ 수정 시작 - 기존 데이터 불러오기
  const handleStartEdit = async (item: any) => {
    setIsEditMode(true);
    setEditingId(item.id);
    setTitle(item.title || "");
    setContent(item.content || "");
    setCategory(item.category || "공지");
    setExistingThumbnail(item.thumbnail || "");
    setExistingFileType(item.fileType || "");
    setFile(null); // 새 파일은 비워둠
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 폼으로 스크롤
  };

  // ✅ 수정 완료
  const handleUpdate = async () => {
    if (!title || !content) return alert("제목과 내용을 입력해주세요.");
    if (!editingId) return alert("수정할 게시물을 찾을 수 없습니다.");

    setUploading(true);
    let fileUrl = existingThumbnail; // 기본값은 기존 썸네일
    let fileType = existingFileType;

    try {
      // 새 파일이 업로드된 경우에만 새로 업로드
      if (file) {
        const storageRef = ref(storage, `${activeTab}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        fileUrl = await getDownloadURL(storageRef);
        fileType = file.type.startsWith("video") ? "video" : "image";
      }

      await updateDoc(doc(db, activeTab, editingId), {
        title,
        content,
        category: activeTab === 'news' ? category : null,
        thumbnail: fileUrl,
        fileType,
        // 수정일은 업데이트하지 않고 원본 유지
      });

      alert("수정되었습니다!");
      handleCancelEdit();
      fetchData(activeTab);
    } catch (e) {
      console.error(e);
      alert("수정 실패");
    } finally {
      setUploading(false);
    }
  };

  // --- 글 삭제 ---
  const handleDelete = async (id: string) => {
    if(!confirm("정말 삭제하시겠습니까? (복구 불가)")) return;
    try {
      let collectionName = activeTab;
      await deleteDoc(doc(db, collectionName, id));
      alert("삭제되었습니다.");
      handleCancelEdit(); // 삭제 시 수정 모드도 취소
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

        {/* 탭 메뉴 */}
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
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    {isEditMode ? (
                      <>
                        <Edit2 size={20} className="text-orange-600" />
                        <span className="text-orange-600">글 수정</span>
                      </>
                    ) : (
                      <>
                        <Upload size={20} /> 새 글 등록 ({activeTab === 'tips' ? '꿀팁' : '뉴스'})
                      </>
                    )}
                  </h2>
                  {isEditMode && (
                    <button
                      onClick={handleCancelEdit}
                      className="text-gray-400 hover:text-red-500 flex items-center gap-1 text-sm"
                    >
                      <X size={16}/> 취소
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  {/* ✅ 뉴스 탭일 때만 카테고리 선택 노출 */}
                  {activeTab === 'news' && (
                    <select 
                      value={category} 
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="공지">공지</option>
                      <option value="이벤트">이벤트</option>
                      <option value="패치">패치</option>
                      <option value="점검">점검</option>
                    </select>
                  )}

                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>
                  <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력하세요" className="w-full p-3 border border-gray-300 rounded-lg h-40 resize-none focus:ring-2 focus:ring-blue-500 outline-none"/>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="hidden" id="file-upload"/>
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2 text-gray-500 hover:text-blue-600">
                        <Upload size={24}/>
                        {file ? <span className="text-blue-600 font-bold">{file.name}</span> : "사진/동영상 클릭하여 업로드"}
                    </label>
                  </div>
                  {existingThumbnail && !file && (
                    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                      <p className="text-xs text-gray-500 mb-2">기존 파일:</p>
                      {existingFileType === "video" ? (
                        <video src={existingThumbnail} className="w-full h-32 object-cover rounded" />
                      ) : (
                        <img src={existingThumbnail} alt="기존 썸네일" className="w-full h-32 object-cover rounded" />
                      )}
                      <p className="text-xs text-gray-400 mt-2">* 새 파일을 업로드하지 않으면 기존 파일이 유지됩니다</p>
                    </div>
                  )}

                  <button
                    onClick={isEditMode ? handleUpdate : handleUpload}
                    disabled={uploading}
                    className={`w-full py-3 rounded-xl font-bold transition shadow-md disabled:bg-gray-400 ${
                      isEditMode
                        ? "bg-orange-600 hover:bg-orange-700 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {uploading ? (isEditMode ? "수정 중..." : "업로드 중...") : (isEditMode ? "수정하기" : "등록하기")}
                  </button>

                  {isEditMode && (
                    <button
                      onClick={handleCancelEdit}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-bold transition"
                    >
                      수정 취소
                    </button>
                  )}
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
                  <div key={item.id} className={`bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center group hover:border-blue-300 transition ${
                    editingId === item.id ? 'border-orange-400 bg-orange-50' : 'border-gray-200'
                  }`}>
                    <div className="flex-1 truncate pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        {/* 카테고리 뱃지 표시 */}
                        {item.category && (
                           <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-bold border border-gray-200">
                             {item.category}
                           </span>
                        )}
                        {activeTab === 'reviews' && item.server && (
                          <span className="bg-indigo-50 text-indigo-600 text-[10px] px-1.5 py-0.5 rounded font-bold border border-indigo-100">
                            {item.server}
                          </span>
                        )}
                        <h3 className="font-bold text-gray-800 truncate text-sm md:text-base">{item.title}</h3>
                      </div>
                      <div className="text-xs text-gray-400 flex gap-2">
                        <span>{item.date}</span>
                        {activeTab === 'reviews' && item.author && (
                          <>
                            <span className="text-gray-300">|</span>
                            <span>{item.author}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {item.thumbnail && (
                      <img src={item.thumbnail} alt="thumb" className="w-10 h-10 rounded-lg object-cover bg-gray-100 mr-3 border border-gray-200"/>
                    )}

                    <div className="flex gap-2">
                      {activeTab !== 'reviews' && (
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="text-gray-300 hover:text-orange-500 p-2 rounded-lg hover:bg-orange-50 transition"
                          title="수정하기"
                        >
                          <Edit2 size={18}/>
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-gray-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition"
                        title="삭제하기"
                      >
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  </div>
                ))
              )}
          </div>
        </div>
      </div>
    </div>
  );
}