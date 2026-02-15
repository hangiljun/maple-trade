"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { Plus, Trash2, Edit, Save, Image as ImageIcon, RefreshCcw } from "lucide-react";
import { db } from '../../firebase';
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

export default function AdminPage() {
  // --- 상태 관리 ---
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("news");

  // 데이터 리스트 상태
  const [newsList, setNewsList] = useState<any[]>([]);
  const [tipsList, setTipsList] = useState<any[]>([]);
  const [reviewsList, setReviewsList] = useState<any[]>([]);

  // 입력 폼 상태
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  
  // [추가됨] 뉴스 카테고리 상태 (기본값: 공지)
  const [category, setCategory] = useState("공지");

  // --- 로그인 처리 ---
  const handleLogin = () => {
    if (password === "1234") {
      setIsAdmin(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  // --- 데이터 불러오기 ---
  useEffect(() => {
    if (!isAdmin) return;

    // 1. 뉴스 구독
    const qNews = query(collection(db, "news"), orderBy("createdAt", "desc"));
    const unsubNews = onSnapshot(qNews, (snap) => setNewsList(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    // 2. 팁 구독
    const qTips = query(collection(db, "tips"), orderBy("createdAt", "desc"));
    const unsubTips = onSnapshot(qTips, (snap) => setTipsList(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    // 3. 후기 구독
    const qReviews = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubReviews = onSnapshot(qReviews, (snap) => setReviewsList(snap.docs.map(d => ({ id: d.id, ...d.data() }))));

    return () => { unsubNews(); unsubTips(); unsubReviews(); };
  }, [isAdmin]);

  // --- 글 저장 함수 ---
  const handleSave = async (collectionName: string) => {
    if (!inputTitle || !inputContent) return alert("제목과 내용을 모두 입력해주세요.");
    
    try {
      await addDoc(collection(db, collectionName), {
        // 뉴스가 아닐 경우 카테고리는 저장하지 않음 (또는 '일반'으로 저장)
        category: collectionName === "news" ? category : "일반", 
        title: inputTitle,
        content: inputContent,
        date: new Date().toLocaleDateString('ko-KR'),
        createdAt: serverTimestamp(),
      });
      alert("등록되었습니다!");
      setInputTitle(""); 
      setInputContent("");
      setCategory("공지"); // 저장 후 카테고리 초기화
    } catch (e) {
      alert("에러 발생: " + e);
    }
  };

  // --- 글 삭제 함수 ---
  const handleDelete = async (collectionName: string, id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, collectionName, id));
        alert("삭제되었습니다.");
      } catch (e) {
        alert("삭제 실패: " + e);
      }
    }
  };

  // --- 로그인 화면 ---
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">관리자 접속</h2>
          <input 
            type="password" 
            placeholder="비밀번호 (1234)" 
            className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">로그인</button>
          <div className="text-center mt-4">
             <Link href="/" className="text-sm text-gray-500 hover:text-blue-500">← 메인으로 돌아가기</Link>
          </div>
        </div>
      </div>
    );
  }

  // --- 관리자 대시보드 화면 ---
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
          <p className="text-gray-500 text-sm mt-1">구글 데이터베이스(Firebase)와 정상 연결됨 🟢</p>
        </div>
        <Link href="/" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-200">
          내 사이트 바로가기
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 사이드바 메뉴 */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 h-fit border border-gray-200">
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setActiveTab("news")}
                className={`w-full text-left px-4 py-3 rounded-md font-medium transition ${activeTab === "news" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-600"}`}
              >
                📢 메이플 이슈 (뉴스)
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("guide")}
                className={`w-full text-left px-4 py-3 rounded-md font-medium transition ${activeTab === "guide" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-600"}`}
              >
                💡 거래방법 (이용안내)
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab("reviews")}
                className={`w-full text-left px-4 py-3 rounded-md font-medium transition ${activeTab === "reviews" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-600"}`}
              >
                💬 이용후기 관리
              </button>
            </li>
             <li>
              <button 
                onClick={() => setActiveTab("main")}
                className={`w-full text-left px-4 py-3 rounded-md font-medium transition ${activeTab === "main" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-600"}`}
              >
                🖼️ 메인 홍보 관리
              </button>
            </li>
          </ul>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          
          {/* [1] 최신 뉴스 관리 섹션 */}
          {activeTab === "news" && (
            <div>
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">메이플 이슈 작성 및 관리</h2>
              
              {/* 글쓰기 폼 */}
              <div className="bg-gray-50 p-5 rounded-xl mb-8 border border-gray-200">
                
                {/* [추가됨] 카테고리 선택 박스 */}
                <label className="block text-sm font-bold text-gray-700 mb-2">카테고리 선택</label>
                <select 
                  className="w-full p-3 border rounded-lg mb-3 bg-white focus:outline-none focus:border-blue-500 font-bold text-gray-700"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="공지">📢 공지사항</option>
                  <option value="이벤트">🎉 이벤트</option>
                  <option value="패치">🛠️ 패치노트</option>
                  <option value="점검">⚠️ 점검안내</option>
                  <option value="이슈">🔥 화제의 이슈</option>
                </select>

                <input 
                  type="text" 
                  placeholder="제목을 입력하세요" 
                  className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:border-blue-500"
                  value={inputTitle} 
                  onChange={(e) => setInputTitle(e.target.value)}
                />
                <textarea 
                  placeholder="내용을 입력하세요" 
                  className="w-full p-3 border rounded-lg h-32 mb-3 focus:outline-none focus:border-blue-500"
                  value={inputContent} 
                  onChange={(e) => setInputContent(e.target.value)}
                />
                <button 
                  onClick={() => handleSave("news")}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2"
                >
                  <Save size={18} /> 뉴스 등록하기
                </button>
              </div>

              {/* 리스트 */}
              <div className="space-y-4">
                {newsList.length === 0 ? <p className="text-center text-gray-400 py-10">등록된 뉴스가 없습니다.</p> : 
                  newsList.map((item) => (
                  <div key={item.id} className="border p-5 rounded-xl flex justify-between items-start hover:bg-gray-50 transition">
                    <div>
                       {/* [추가됨] 리스트에 카테고리 표시 */}
                      <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold mb-1 mr-2">
                        {item.category || "공지"}
                      </span>
                      <h3 className="font-bold text-gray-800 text-lg inline-block">{item.title}</h3>
                      <p className="text-gray-600 mt-1 whitespace-pre-line">{item.content}</p>
                      <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete("news", item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      title="삭제"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* [2] 이용안내 (기존 유지) */}
          {activeTab === "guide" && (
            <div>
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">거래 방법(Tip) 작성 및 관리</h2>
              <div className="bg-gray-50 p-5 rounded-xl mb-8 border border-gray-200">
                <input 
                  type="text" placeholder="팁 제목" className="w-full p-3 border rounded-lg mb-3"
                  value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}
                />
                <textarea 
                  placeholder="상세 내용" className="w-full p-3 border rounded-lg h-32 mb-3"
                  value={inputContent} onChange={(e) => setInputContent(e.target.value)}
                />
                <button onClick={() => handleSave("tips")} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 flex justify-center items-center gap-2"><Plus size={18} /> 가이드 등록하기</button>
              </div>
              <div className="space-y-4">
                {tipsList.map((item) => (
                  <div key={item.id} className="border p-5 rounded-xl flex justify-between items-start hover:bg-gray-50">
                    <div><h3 className="font-bold text-gray-800 text-lg">💡 {item.title}</h3><p className="text-gray-600 mt-1">{item.content}</p></div>
                    <button onClick={() => handleDelete("tips", item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* [3] 후기 관리 (기존 유지) */}
           {activeTab === "reviews" && (
            <div>
              <h2 className="text-xl font-bold mb-6 border-b pb-2">유저 후기 관리</h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="py-3 px-4 font-semibold text-gray-600">작성자/서버</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">내용</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">날짜</th>
                    <th className="py-3 px-4 font-semibold text-gray-600 w-20">관리</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewsList.map((review) => (
                    <tr key={review.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-bold text-gray-700">{review.name}<br/><span className="text-xs font-normal text-blue-500 bg-blue-50 px-2 py-0.5 rounded">{review.server}</span></td>
                      <td className="py-3 px-4 text-gray-600 max-w-xs">{review.content}</td>
                      <td className="py-3 px-4 text-sm text-gray-400">{review.date}</td>
                      <td className="py-3 px-4"><button onClick={() => handleDelete("reviews", review.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* [4] 메인 홍보 관리 (기존 유지) */}
          {activeTab === "main" && (
            <div>
              <h2 className="text-xl font-bold mb-6 border-b pb-2">메인 페이지 관리</h2>
              <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800 text-sm mb-6">🚧 이미지 업로드 준비 중</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 <div className="aspect-video bg-gray-100 rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-50"><ImageIcon className="text-gray-400 mb-2" /><span className="text-sm text-gray-500">이미지 추가 (준비중)</span></div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}