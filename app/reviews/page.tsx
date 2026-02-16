"use client";
import React, { useState, useEffect } from "react";
import { Search, PenTool, MessageSquare, Eye, ArrowLeft, User, Calendar } from "lucide-react";
import { db } from '../../firebase'; 
import { collection, addDoc, getDocs, doc, updateDoc, increment, query, orderBy, serverTimestamp, arrayUnion, getDoc } from 'firebase/firestore';

// --- 데이터 타입 정의 ---
interface Comment {
  author: string;
  content: string;
  date: string;
}

interface Review {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  views: number;
  comments: Comment[];
}

export default function ReviewsPage() {
  // 화면 상태 관리 ('list': 목록, 'write': 글쓰기, 'detail': 상세내용)
  const [viewState, setViewState] = useState<'list' | 'write' | 'detail'>('list');
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // 글쓰기 입력값
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // 댓글 입력값
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");

  // 1. 게시글 목록 불러오기
  const fetchReviews = async () => {
    try {
      const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const loadedReviews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(loadedReviews);
    } catch (e) {
      console.error("데이터 로딩 실패:", e);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 2. 글 저장하기 (DB 전송)
  const handleWriteSubmit = async () => {
    if (!inputTitle || !inputContent || !inputAuthor) return alert("닉네임, 제목, 내용을 모두 입력해주세요.");
    
    if(!confirm("후기를 등록하시겠습니까?")) return;

    try {
      await addDoc(collection(db, "reviews"), {
        title: inputTitle,
        content: inputContent,
        author: inputAuthor,
        password: inputPassword, 
        date: new Date().toLocaleDateString('ko-KR', {year: '2-digit', month: '2-digit', day: '2-digit'}), // 24.02.16 형식
        createdAt: serverTimestamp(),
        views: 0,
        comments: [] 
      });
      alert("소중한 후기가 등록되었습니다! 🎉");
      // 초기화 후 목록으로 이동
      setInputTitle(""); setInputContent(""); setInputAuthor(""); setInputPassword("");
      setViewState('list');
      fetchReviews(); 
    } catch (e) {
      console.error(e);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  // 3. 게시글 클릭 시 (상세보기 + 조회수 증가)
  const handleReadReview = async (review: Review) => {
    // 1. 조회수 1 증가시키기
    const reviewRef = doc(db, "reviews", review.id);
    await updateDoc(reviewRef, { views: increment(1) });
    
    // 2. 최신 데이터(댓글 포함) 가져오기
    const newDoc = await getDoc(reviewRef);
    if (newDoc.exists()) {
       setSelectedReview({ id: newDoc.id, ...newDoc.data() } as Review);
    }
    
    // 3. 화면을 '상세보기'로 전환
    setViewState('detail');
  };

  // 4. 댓글 등록하기
  const handleAddComment = async () => {
    if (!selectedReview || !commentAuthor || !commentContent) return alert("닉네임과 내용을 입력해주세요.");

    const newComment = {
      author: commentAuthor,
      content: commentContent,
      date: new Date().toLocaleDateString('ko-KR', {month: '2-digit', day: '2-digit'})
    };

    try {
      const reviewRef = doc(db, "reviews", selectedReview.id);
      await updateDoc(reviewRef, {
        comments: arrayUnion(newComment)
      });
      
      // 화면에 즉시 반영
      setSelectedReview(prev => prev ? { ...prev, comments: [...(prev.comments || []), newComment] } : null);
      setCommentContent(""); // 내용은 비우고 닉네임은 유지 (편의성)
    } catch (e) {
      console.error(e);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* 상단 헤더 & 버튼 */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">📢 이용후기</h1>
            <p className="text-gray-500 text-sm">고객님들의 소중한 거래 후기 (100% 리얼)</p>
          </div>
          
          {/* 목록 화면일 땐 '글쓰기' 버튼, 아닐 땐 '목록으로' 버튼 */}
          {viewState === 'list' ? (
            <button 
              onClick={() => setViewState('write')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold transition shadow-md flex items-center gap-2"
            >
              <PenTool size={18}/> 후기 쓰기
            </button>
          ) : (
            <button 
              onClick={() => {setViewState('list'); fetchReviews();}} 
              className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg font-bold flex items-center gap-1 transition"
            >
              <ArrowLeft size={18}/> 목록으로
            </button>
          )}
        </div>

        {/* ============================== */}
        {/* [1] 목록 화면 (List View) */}
        {/* ============================== */}
        {viewState === 'list' && (
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <table className="w-full text-center">
                <thead className="bg-gray-50 text-gray-600 border-b border-gray-200 uppercase text-xs font-bold tracking-wider">
                  <tr>
                    <th className="py-4 w-14 md:w-20">번호</th>
                    <th className="py-4 text-left pl-6">제목</th>
                    <th className="py-4 w-24 md:w-36">작성자</th>
                    <th className="py-4 w-24 md:w-32">날짜</th>
                    <th className="py-4 w-14 md:w-20">조회</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reviews.length === 0 ? (
                    <tr><td colSpan={5} className="py-16 text-gray-400">아직 등록된 후기가 없습니다.</td></tr>
                  ) : (
                    reviews.map((review, index) => (
                      <tr 
                        key={review.id} 
                        onClick={() => handleReadReview(review)} 
                        className="hover:bg-blue-50/50 cursor-pointer transition duration-150 group"
                      >
                        <td className="py-4 text-gray-400 font-medium">{reviews.length - index}</td>
                        <td className="py-4 text-left pl-6 font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate max-w-[160px] md:max-w-none">
                          {review.title}
                          {/* 댓글 개수 표시 */}
                          {review.comments?.length > 0 && (
                            <span className="ml-2 text-[10px] align-middle bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-md font-bold border border-blue-200">
                              {review.comments.length}
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-gray-600 text-sm">{review.author}</td>
                        <td className="py-4 text-gray-400 text-sm">{review.date}</td>
                        <td className="py-4 text-gray-400 text-sm">{review.views}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* 검색창 (UI만 구현) */}
            <div className="flex justify-center mt-4 gap-2">
              <div className="relative">
                <input type="text" placeholder="제목 검색" className="pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"/>
                <Search className="absolute left-3 top-3 text-gray-400" size={18}/>
              </div>
              <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2.5 rounded-lg font-bold shadow-sm transition">검색</button>
            </div>
          </div>
        )}

        {/* ============================== */}
        {/* [2] 글쓰기 화면 (Write View) */}
        {/* ============================== */}
        {viewState === 'write' && (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 flex items-center gap-2">
              <PenTool className="text-blue-600"/> 솔직 후기 작성
            </h2>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">닉네임</label>
                  <input value={inputAuthor} onChange={(e)=>setInputAuthor(e.target.value)} placeholder="작성자명" className="w-full bg-gray-50 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"/>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">비밀번호</label>
                  <input value={inputPassword} onChange={(e)=>setInputPassword(e.target.value)} type="password" placeholder="글 삭제시 필요" className="w-full bg-gray-50 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition"/>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">제목</label>
                <input value={inputTitle} onChange={(e)=>setInputTitle(e.target.value)} placeholder="제목을 입력하세요" className="w-full bg-gray-50 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition font-bold"/>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">내용</label>
                <textarea value={inputContent} onChange={(e)=>setInputContent(e.target.value)} placeholder="거래는 어떠셨나요? 솔직한 후기를 남겨주세요." className="w-full h-48 bg-gray-50 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition"></textarea>
              </div>
              <button onClick={handleWriteSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition transform hover:-translate-y-1">등록 완료</button>
            </div>
          </div>
        )}

        {/* ============================== */}
        {/* [3] 상세 보기 화면 (Detail View) */}
        {/* ============================== */}
        {viewState === 'detail' && selectedReview && (
          <div className="max-w-4xl mx-auto">
            {/* 3-1. 글 본문 */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">
              <div className="bg-gray-50/80 border-b border-gray-200 p-6 md:p-8">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded mb-3 inline-block">Review</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">{selectedReview.title}</h2>
                <div className="flex justify-between items-center text-gray-500 text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-medium text-gray-700"><User size={16}/> {selectedReview.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={16}/> {selectedReview.date}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                    <Eye size={14}/> {selectedReview.views}
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8 min-h-[150px] text-gray-800 leading-relaxed whitespace-pre-line text-lg">
                {selectedReview.content}
              </div>
            </div>

            {/* 3-2. 댓글 영역 */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
              <h3 className="font-bold text-xl mb-6 flex items-center gap-2 text-gray-900">
                <MessageSquare className="text-blue-600"/> 
                댓글 <span className="text-blue-600">{selectedReview.comments?.length || 0}</span>
              </h3>

              {/* 댓글 리스트 */}
              <div className="space-y-4 mb-8">
                {(!selectedReview.comments || selectedReview.comments.length === 0) ? (
                  <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-400">
                    첫 댓글의 주인공이 되어보세요! 💬
                  </div>
                ) : (
                  selectedReview.comments.map((comment, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-gray-900 flex items-center gap-2">
                          {comment.author}
                          {comment.author === selectedReview.author && <span className="text-[10px] bg-blue-100 text-blue-600 px-1 rounded">작성자</span>}
                        </span>
                        <span className="text-xs text-gray-400">{comment.date}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>

              {/* 댓글 작성 폼 */}
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input 
                      value={commentAuthor} 
                      onChange={(e) => setCommentAuthor(e.target.value)} 
                      placeholder="닉네임" 
                      className="bg-white p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none w-1/3 md:w-1/4 text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <input 
                      value={commentContent} 
                      onChange={(e) => setCommentContent(e.target.value)} 
                      placeholder="댓글 내용을 입력하세요..." 
                      className="bg-white p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none flex-1"
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    />
                    <button onClick={handleAddComment} className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg font-bold transition shadow-sm">등록</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}