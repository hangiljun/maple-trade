"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { Plus, Trash2, Edit, Save, Image as ImageIcon, RefreshCcw } from "lucide-react";
import { db } from '../../firebase';
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("news");

  const [newsList, setNewsList] = useState<any[]>([]);
  const [tipsList, setTipsList] = useState<any[]>([]);
  const [reviewsList, setReviewsList] = useState<any[]>([]);

  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [category, setCategory] = useState("공지");
  const [imageUrl, setImageUrl] = useState(""); // 사진 주소 입력 상태 추가

  const handleLogin = () => {
    if (password === "1234") setIsAdmin(true);
    else alert("비밀번호가 틀렸습니다.");
  };

  useEffect(() => {
    if (!isAdmin) return;
    const qNews = query(collection(db, "news"), orderBy("createdAt", "desc"));
    const unsubNews = onSnapshot(qNews, (snap) => setNewsList(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const qTips = query(collection(db, "tips"), orderBy("createdAt", "desc"));
    const unsubTips = onSnapshot(qTips, (snap) => setTipsList(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    const qReviews = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const unsubReviews = onSnapshot(qReviews, (snap) => setReviewsList(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    return () => { unsubNews(); unsubTips(); unsubReviews(); };
  }, [isAdmin]);

  const handleSave = async (collectionName: string) => {
    if (!inputTitle || !inputContent) return alert("제목과 내용을 모두 입력해주세요.");
    try {
      await addDoc(collection(db, collectionName), {
        category: collectionName === "news" ? category : "일반", 
        title: inputTitle,
        content: inputContent,
        thumbnail: collectionName === "news" ? imageUrl : "", // 뉴스일 때만 사진 주소 저장
        date: new Date().toLocaleDateString('ko-KR'),
        createdAt: serverTimestamp(),
      });
      alert("등록되었습니다!");
      setInputTitle(""); 
      setInputContent("");
      setImageUrl("");
      setCategory("공지");
    } catch (e) {
      alert("에러 발생: " + e);
    }
  };

  const handleDelete = async (collectionName: string, id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteDoc(doc(db, collectionName, id));
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">관리자 접속</h2>
          <input type="password" placeholder="비밀번호" className="w-full p-3 border rounded-lg mb-4" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
          <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition">로그인</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
        <Link href="/" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold">내 사이트 바로가기</Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 h-fit border border-gray-200">
          <ul className="space-y-2">
            {['news', 'guide', 'reviews', 'main'].map((tab) => (
              <li key={tab}>
                <button onClick={() => setActiveTab(tab)} className={`w-full text-left px-4 py-3 rounded-md font-medium transition ${activeTab === tab ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50 text-gray-600"}`}>
                  {tab === 'news' ? '📢 메이플 이슈' : tab === 'guide' ? '💡 거래방법' : tab === 'reviews' ? '💬 이용후기' : '🖼️ 메인 관리'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === "news" && (
            <div>
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">메이플 이슈 작성</h2>
              <div className="bg-gray-50 p-5 rounded-xl mb-8 border border-gray-200">
                <select className="w-full p-3 border rounded-lg mb-3 bg-white font-bold" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="공지">📢 공지사항</option>
                  <option value="이벤트">🎉 이벤트</option>
                  <option value="패치">🛠️ 패치노트</option>
                  <option value="점검">⚠️ 점검안내</option>
                  <option value="이슈">🔥 화제의 이슈</option>
                </select>
                <input type="text" placeholder="제목을 입력하세요" className="w-full p-3 border rounded-lg mb-3" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
                <textarea placeholder="내용을 입력하세요" className="w-full p-3 border rounded-lg h-32 mb-3" value={inputContent} onChange={(e) => setInputContent(e.target.value)} />
                
                {/* 사진 URL 입력칸 추가 */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-1">사진 등록 (이미지 주소)</label>
                  <input type="text" placeholder="https://... 사진 URL을 입력하세요" className="w-full p-3 border rounded-lg mb-2" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
                  {imageUrl && <img src={imageUrl} alt="미리보기" className="w-24 h-20 object-cover rounded border" />}
                </div>

                <button onClick={() => handleSave("news")} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2"><Save size={18} /> 뉴스 등록하기</button>
              </div>

              <div className="space-y-4">
                {newsList.map((item) => (
                  <div key={item.id} className="border p-5 rounded-xl flex justify-between items-start hover:bg-gray-50">
                    <div className="flex gap-4">
                      {item.thumbnail && <img src={item.thumbnail} className="w-16 h-12 object-cover rounded" alt="thumb" />}
                      <div>
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold mb-1 mr-2">{item.category || "공지"}</span>
                        <h3 className="font-bold text-gray-800 inline-block">{item.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete("news", item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* 다른 탭 로직은 기존과 동일하므로 생략하거나 기존 코드를 유지하세요 */}
        </div>
      </div>
    </div>
  );
}