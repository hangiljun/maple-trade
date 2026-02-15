"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { Plus, Trash2, Save, Image as ImageIcon } from "lucide-react";
// ⚠️ [중요] storage를 가져옵니다. 경로가 ../../firebase 인지 확인하세요!
import { db, storage } from '../../firebase'; 
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
  const [imageUrl, setImageUrl] = useState(""); // 이미지 주소 저장용
  const [isUploading, setIsUploading] = useState(false); // 로딩 상태

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

  // [핵심] 사진 선택 시 자동으로 파이어베이스 창고(Storage)로 업로드
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true); // 로딩 시작
    try {
      // 저장 경로: news_images 폴더 / 현재시간_파일명
      const storageRef = ref(storage, `news_images/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file); // 업로드
      const url = await getDownloadURL(storageRef); // 다운로드 주소 받기
      
      setImageUrl(url); // 주소 저장
      alert("이미지 업로드 성공! 📸");
    } catch (error) {
      console.error("업로드 에러:", error);
      alert("이미지 업로드 중 오류가 발생했습니다. (Storage 설정을 확인하세요)");
    } finally {
      setIsUploading(false); // 로딩 끝
    }
  };

  const handleSave = async (collectionName: string) => {
    if (!inputTitle || !inputContent) return alert("제목과 내용을 입력해주세요.");
    
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
      // 입력창 초기화
      setInputTitle(""); setInputContent(""); setImageUrl(""); setCategory("공지");
    } catch (e) {
      alert("에러 발생: " + e);
    }
  };

  const handleDelete = async (collectionName: string, id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) await deleteDoc(doc(db, collectionName, id));
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
          <h2 className="text-2xl font-bold mb-6">관리자 접속</h2>
          <input type="password" placeholder="비밀번호 (1234)" className="w-full p-3 border rounded-lg mb-4" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
          <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold">로그인</button>
          <div className="text-center mt-4"><Link href="/" className="text-sm text-gray-500">← 메인으로</Link></div>
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
        {/* 사이드바 메뉴 */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 h-fit border border-gray-200">
          <ul className="space-y-2">
            {['news', 'guide', 'reviews', 'main'].map(tab => (
              <li key={tab}>
                <button onClick={() => setActiveTab(tab)} className={`w-full text-left px-4 py-3 rounded-md font-bold ${activeTab === tab ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}`}>
                  {tab === 'news' ? '📢 메이플 이슈' : tab === 'guide' ? '💡 거래방법' : tab === 'reviews' ? '💬 이용후기' : '🖼️ 메인 관리'}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 컨텐츠 영역 */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === "news" && (
            <div>
              <h2 className="text-xl font-bold mb-6 border-b pb-2">메이플 이슈 작성</h2>
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
                
                {/* [수정됨] 사진 업로드 UI */}
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">사진 업로드</label>
                  <div className="flex items-center gap-3">
                    <label className={`cursor-pointer border border-gray-300 px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm transition ${isUploading ? 'bg-gray-100 text-gray-400' : 'bg-white hover:bg-gray-50 text-gray-700'}`}>
                      <ImageIcon size={18} />
                      {isUploading ? "업로드 중..." : "📷 사진 선택"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={isUploading} />
                    </label>
                    {imageUrl && <span className="text-sm text-green-600 font-bold">✅ 준비 완료!</span>}
                  </div>
                  {imageUrl && <div className="mt-3"><img src={imageUrl} alt="미리보기" className="w-40 h-auto rounded-lg border shadow-sm" /></div>}
                </div>

                <button onClick={() => handleSave("news")} disabled={isUploading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2">
                  <Save size={18} /> 뉴스 등록하기
                </button>
              </div>

              {/* 리스트 표시 */}
              <div className="space-y-4">
                {newsList.map((item) => (
                  <div key={item.id} className="border p-5 rounded-xl flex justify-between items-start hover:bg-gray-50">
                    <div className="flex gap-4">
                      {item.thumbnail && <img src={item.thumbnail} className="w-20 h-16 object-cover rounded-lg border" alt="thumb" />}
                      <div>
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold mb-1 mr-2">{item.category || "공지"}</span>
                        <h3 className="font-bold text-gray-800">{item.title}</h3>
                        <p className="text-xs text-gray-400 mt-1">{item.date}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete("news", item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* 다른 탭들 (기존 기능 유지) */}
          {activeTab === "guide" && (
            <div>
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-2">거래 방법(Tip) 작성</h2>
              <div className="bg-gray-50 p-5 rounded-xl mb-8 border border-gray-200">
                <input type="text" placeholder="팁 제목" className="w-full p-3 border rounded-lg mb-3" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} />
                <textarea placeholder="상세 내용" className="w-full p-3 border rounded-lg h-32 mb-3" value={inputContent} onChange={(e) => setInputContent(e.target.value)} />
                <button onClick={() => handleSave("tips")} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 flex justify-center items-center gap-2"><Plus size={18} /> 가이드 등록하기</button>
              </div>
              <div className="space-y-4">
                {tipsList.map((item) => (
                  <div key={item.id} className="border p-5 rounded-xl flex justify-between items-start hover:bg-gray-50"><div><h3 className="font-bold text-gray-800 text-lg">💡 {item.title}</h3><p className="text-gray-600 mt-1">{item.content}</p></div><button onClick={() => handleDelete("tips", item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20} /></button></div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h2 className="text-xl font-bold mb-6 border-b pb-2">유저 후기 관리</h2>
              <table className="w-full text-left border-collapse">
                <thead><tr className="bg-gray-100 border-b"><th className="py-3 px-4 text-gray-600">작성자/서버</th><th className="py-3 px-4 text-gray-600">내용</th><th className="py-3 px-4 text-gray-600">날짜</th><th className="py-3 px-4 text-gray-600 w-20">관리</th></tr></thead>
                <tbody>{reviewsList.map((review) => (<tr key={review.id} className="border-b hover:bg-gray-50"><td className="py-3 px-4 font-bold text-gray-700">{review.name}<br/><span className="text-xs text-blue-500 bg-blue-50 px-2 py-0.5 rounded">{review.server}</span></td><td className="py-3 px-4 text-gray-600 max-w-xs">{review.content}</td><td className="py-3 px-4 text-sm text-gray-400">{review.date}</td><td className="py-3 px-4"><button onClick={() => handleDelete("reviews", review.id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={18} /></button></td></tr>))}</tbody>
              </table>
            </div>
          )}

          {activeTab === "main" && (
            <div><h2 className="text-xl font-bold mb-6 border-b pb-2">메인 페이지 관리</h2><div className="bg-yellow-50 p-4 rounded-lg text-yellow-800 text-sm mb-6">🚧 배너 이미지 업로드 준비 중</div></div>
          )}
        </div>
      </div>
    </div>
  );
}