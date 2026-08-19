"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  collection, addDoc, deleteDoc, doc, getDocs, query, orderBy, updateDoc
} from "firebase/firestore";
import {
  ref, uploadBytes, getDownloadURL
} from "firebase/storage";
import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged, User
} from "firebase/auth";
import { db, storage, auth } from '../../firebase';
import { Trash2, Upload, LogOut, Lock, ShieldAlert, Key, User as UserIcon, MessageCircle, Edit2, X, Plus, Image as ImageIcon, Type } from "lucide-react";
import BlockEditor from '../components/BlockEditor';

// 🔒 [보안] 관리자 이메일 설정
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "6332159@gmail.com";

// 블록 타입 정의
type ContentBlock = {
  id: string;
  type: 'text' | 'image';
  content?: string;
  url?: string;
  file?: File | null;
};

export default function AdminPage() {
  // --- 인증 상태 ---
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- 로그인 입력 상태 ---
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // --- 데이터 상태 ---
  const [activeTab, setActiveTab] = useState("tips");
  const [list, setList] = useState<any[]>([]);

  // 글쓰기 폼 상태
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [category, setCategory] = useState("공지");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [existingThumbnail, setExistingThumbnail] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  // ✅ 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

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
        // 디버깅용 로그
        console.log("🔍 로그인한 이메일:", currentUser.email);
        console.log("🔍 허용된 관리자 이메일:", ADMIN_EMAIL);
        console.log("🔍 일치 여부:", currentUser.email === ADMIN_EMAIL);

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
    handleCancelEdit();
  };

  // ✅ 수정 취소 함수
  const handleCancelEdit = useCallback(() => {
    setIsEditMode(false);
    setEditingId(null);
    setTitle("");
    setBlocks([]);
    setCategory("공지");
    setThumbnailFile(null);
    setExistingThumbnail("");
  }, []);

  // ✅ 블록 추가 함수
  const addTextBlock = useCallback(() => {
    setBlocks(prev => [...prev, {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'text',
      content: ''
    }]);
  }, []);

  const addImageBlock = useCallback(() => {
    setBlocks(prev => [...prev, {
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'image',
      url: ''
    }]);
  }, []);

  // ✅ 블록 삭제 (useCallback 적용)
  const removeBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  }, []);

  // ✅ 블록 내용 변경 (useCallback 적용) - 성능 개선 핵심!
  const updateBlockContent = useCallback((id: string, content: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, content } : b));
  }, []);

  // ✅ 블록 이미지 파일 변경 (useCallback 적용)
  const updateBlockFile = useCallback((id: string, file: File | null) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, file } : b));
  }, []);

  // ✅ 블록 위로 이동 (useCallback 적용)
  const moveBlockUp = useCallback((index: number) => {
    if (index === 0) return;
    setBlocks(prev => {
      const newBlocks = [...prev];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      return newBlocks;
    });
  }, []);

  // ✅ 블록 아래로 이동 (useCallback 적용)
  const moveBlockDown = useCallback((index: number) => {
    setBlocks(prev => {
      if (index === prev.length - 1) return prev;
      const newBlocks = [...prev];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      return newBlocks;
    });
  }, []);

  // --- 글 등록 (블록 기반) ---
  const handleUpload = async () => {
    if (!title) return alert("제목을 입력해주세요.");
    if (blocks.length === 0) return alert("최소 1개 이상의 블록을 추가해주세요.");

    setUploading(true);

    try {
      let thumbnailUrl = '';
      if (thumbnailFile) {
        const thumbRef = ref(storage, `${activeTab}/thumbnails/${Date.now()}_${thumbnailFile.name}`);
        await uploadBytes(thumbRef, thumbnailFile);
        thumbnailUrl = await getDownloadURL(thumbRef);
      }

      const uploadedBlocks = await Promise.all(
        blocks.map(async (block) => {
          if (block.type === 'image' && block.file) {
            // 새 이미지 파일 업로드
            const storageRef = ref(storage, `${activeTab}/${Date.now()}_${block.file.name}`);
            await uploadBytes(storageRef, block.file);
            const url = await getDownloadURL(storageRef);
            return { type: 'image', url };
          } else if (block.type === 'text') {
            // 텍스트 블록 - undefined 필드 제거
            return {
              type: 'text',
              content: block.content || ''
            };
          } else if (block.type === 'image' && block.url) {
            // 기존 이미지 URL 유지
            return { type: 'image', url: block.url };
          }
          // 예외 케이스 - undefined 제거
          const cleanBlock: any = { type: block.type };
          if (block.content !== undefined) cleanBlock.content = block.content;
          if (block.url !== undefined) cleanBlock.url = block.url;
          return cleanBlock;
        })
      );

      // undefined 값 제거하여 addDoc 호출
      const newData: any = {
        title,
        blocks: uploadedBlocks,
        date: new Date().toLocaleDateString('ko-KR'),
        createdAt: new Date()
      };

      // category는 news/tips 탭에만 저장
      if (activeTab === 'news' || activeTab === 'tips') {
        newData.category = category;
      }

      // thumbnail이 있을 때만 저장
      if (thumbnailUrl) {
        newData.thumbnail = thumbnailUrl;
      }

      await addDoc(collection(db, activeTab), newData);

      alert("등록되었습니다!");
      setTitle("");
      setBlocks([]);
      setCategory("공지");
      setThumbnailFile(null);
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
    setCategory(item.category || "공지");
    setExistingThumbnail(item.thumbnail || "");

    if (item.blocks && Array.isArray(item.blocks) && item.blocks.length > 0) {
      const baseTime = Date.now();
      const loadedBlocks = item.blocks.map((block: any, index: number) => ({
        id: `edit_${baseTime}_${index}_${Math.random().toString(36).substr(2, 9)}`,
        type: block.type,
        content: block.type === 'text' ? (block.content || '') : undefined,
        url: block.type === 'image' ? (block.url || '') : undefined,
        file: null
      }));
      setBlocks(loadedBlocks);
    } else if (item.content || item.image) {
      const legacyBlocks: ContentBlock[] = [];
      const baseTime = Date.now();
      if (item.content) {
        legacyBlocks.push({
          id: `edit_${baseTime}_0_text`,
          type: 'text',
          content: item.content
        });
      }
      if (item.image) {
        legacyBlocks.push({
          id: `edit_${baseTime}_1_image`,
          type: 'image',
          url: item.image
        });
      }
      setBlocks(legacyBlocks);
    } else {
      setBlocks([]);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ 수정 완료
  const handleUpdate = async () => {
    if (!title) return alert("제목을 입력해주세요.");
    if (blocks.length === 0) return alert("최소 1개 이상의 블록을 추가해주세요.");
    if (!editingId) return alert("수정할 게시물을 찾을 수 없습니다.");

    setUploading(true);

    try {
      let thumbnailUrl = existingThumbnail;
      if (thumbnailFile) {
        const thumbRef = ref(storage, `${activeTab}/thumbnails/${Date.now()}_${thumbnailFile.name}`);
        await uploadBytes(thumbRef, thumbnailFile);
        thumbnailUrl = await getDownloadURL(thumbRef);
      }

      const uploadedBlocks = await Promise.all(
        blocks.map(async (block) => {
          if (block.type === 'image' && block.file) {
            // 새 이미지 파일 업로드
            const storageRef = ref(storage, `${activeTab}/${Date.now()}_${block.file.name}`);
            await uploadBytes(storageRef, block.file);
            const url = await getDownloadURL(storageRef);
            return { type: 'image', url };
          } else if (block.type === 'text') {
            // 텍스트 블록 - undefined 필드 제거
            return {
              type: 'text',
              content: block.content || ''
            };
          } else if (block.type === 'image' && block.url) {
            // 기존 이미지 URL 유지
            return { type: 'image', url: block.url };
          }
          // 예외 케이스 - undefined 제거
          const cleanBlock: any = { type: block.type };
          if (block.content !== undefined) cleanBlock.content = block.content;
          if (block.url !== undefined) cleanBlock.url = block.url;
          return cleanBlock;
        })
      );

      // undefined 값 제거하여 updateDoc 호출
      const updateData: any = {
        title,
        blocks: uploadedBlocks,
      };

      // category는 news/tips 탭에만 저장
      if (activeTab === 'news' || activeTab === 'tips') {
        updateData.category = category;
      }

      // thumbnail이 있을 때만 저장
      if (thumbnailUrl) {
        updateData.thumbnail = thumbnailUrl;
      }

      await updateDoc(doc(db, activeTab, editingId), updateData);

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
      await deleteDoc(doc(db, activeTab, id));
      alert("삭제되었습니다.");
      handleCancelEdit();
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

          {/* 왼쪽: 글쓰기 폼 */}
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
                  {/* 카테고리 선택 */}
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
                  {activeTab === 'tips' && (
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                    >
                      <option value="공지">공지</option>
                      <option value="이용팁">이용팁</option>
                      <option value="안전거래">안전거래</option>
                      <option value="가이드">가이드</option>
                    </select>
                  )}

                  <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력하세요" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"/>

                  {/* 썸네일 업로드 */}
                  <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 bg-purple-50">
                    <div className="flex items-center gap-2 mb-2">
                      <ImageIcon size={16} className="text-purple-600" />
                      <span className="text-sm font-bold text-purple-700">썸네일 사진 (목록용)</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                      className="text-sm w-full"
                    />
                    {thumbnailFile && (
                      <p className="text-xs text-purple-600 mt-2 font-medium">✓ {thumbnailFile.name}</p>
                    )}
                    {existingThumbnail && !thumbnailFile && (
                      <div className="mt-2">
                        <img src={existingThumbnail} alt="기존 썸네일" className="w-20 h-20 object-cover rounded border" />
                        <p className="text-xs text-gray-500 mt-1">기존 썸네일 (새 파일 선택 시 변경)</p>
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-2">* 목록에서 보이는 미리보기 이미지입니다</p>
                  </div>

                  {/* 블록 추가 버튼 */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={addTextBlock}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition"
                    >
                      <Type size={18} /> 텍스트 추가
                    </button>
                    <button
                      type="button"
                      onClick={addImageBlock}
                      className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition"
                    >
                      <ImageIcon size={18} /> 이미지 추가
                    </button>
                  </div>

                  {/* ✅ BlockEditor 컴포넌트 사용 - 블록마다 독립적으로 렌더링 */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {blocks.map((block, index) => (
                      <BlockEditor
                        key={block.id}
                        block={block}
                        index={index}
                        totalBlocks={blocks.length}
                        onContentChange={updateBlockContent}
                        onFileChange={updateBlockFile}
                        onRemove={removeBlock}
                        onMoveUp={moveBlockUp}
                        onMoveDown={moveBlockDown}
                      />
                    ))}
                  </div>

                  {/* 등록/수정 버튼 */}
                  <button
                    onClick={isEditMode ? handleUpdate : handleUpload}
                    disabled={uploading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold transition disabled:opacity-50 shadow-lg"
                  >
                    {uploading ? "처리 중..." : (isEditMode ? "✏️ 수정 완료" : "📤 등록하기")}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* 오른쪽: 데이터 목록 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              📋 등록된 글 ({list.length}개)
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {list.length === 0 ? (
                <p className="text-center text-gray-400 py-10">등록된 글이 없습니다.</p>
              ) : (
                list.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        {item.category && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold mr-2">
                            {item.category}
                          </span>
                        )}
                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                        <p className="text-xs text-blue-500 font-mono mt-0.5">ID: {item.id}</p>
                        {activeTab === 'reviews' && (
                          <div className="text-xs text-gray-500 mt-1">
                            작성자: {item.author} | 서버: {item.server}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-2">
                        {activeTab !== 'reviews' && (
                          <button
                            onClick={() => handleStartEdit(item)}
                            className="text-blue-500 hover:text-blue-700 p-2"
                            title="수정"
                          >
                            <Edit2 size={16}/>
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 hover:text-red-600 p-2"
                          title="삭제"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}