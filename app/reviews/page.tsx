"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ 추가: 페이지 새로고침을 위한 라우터
import { PenTool, Eye, ArrowLeft, User, Calendar } from "lucide-react";
import { db } from '../../firebase'; 
import { collection, addDoc, getDocs, doc, updateDoc, increment, query, orderBy, serverTimestamp, arrayUnion, getDoc } from 'firebase/firestore';

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
 server: string; // ✅ 서버 정보 저장
 date: string;
 views: number;
 comments: Comment[];
}

// ✅ 사장님이 요청하신 9개 서버 목록
const SERVERS = ["챌린저스", "루나", "스카니아", "엘리시움", "크로아", "베라", "오로라", "기타서버", "에오스"];

export default function ReviewsPage() {
 const router = useRouter(); // ✅ 추가: 라우터 초기화
 const [viewState, setViewState] = useState<'list' | 'write' | 'detail'>('list');
 const [reviews, setReviews] = useState<Review[]>([]);
 const [selectedReview, setSelectedReview] = useState<Review | null>(null);

 // 입력 상태
 const [inputTitle, setInputTitle] = useState("");
 const [inputContent, setInputContent] = useState("");
 const [inputAuthor, setInputAuthor] = useState("");
 const [inputServer, setInputServer] = useState("루나"); // ✅ 기본값 설정
 const [inputPassword, setInputPassword] = useState("");

 const [commentAuthor, setCommentAuthor] = useState("");
 const [commentContent, setCommentContent] = useState("");

 // 1. 목록 불러오기
 const fetchReviews = async () => {
   try {
     const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
     const querySnapshot = await getDocs(q);
     const loadedReviews = querySnapshot.docs.map(doc => ({
       id: doc.id,
       ...doc.data()
     })) as Review[];
     setReviews(loadedReviews);
   } catch (e) { console.error(e); }
 };

 useEffect(() => { fetchReviews(); }, []);

 // 2. 글 저장 (서버 정보 포함)
 const handleWriteSubmit = async () => {
   if (!inputTitle || !inputContent || !inputAuthor) return alert("내용을 입력해주세요.");
   try {
     await addDoc(collection(db, "reviews"), {
       title: inputTitle,
       content: inputContent,
       author: inputAuthor,
       server: inputServer, // ✅ 선택한 서버 저장
       password: inputPassword, 
       date: new Date().toLocaleDateString('ko-KR', {year: '2-digit', month: '2-digit', day: '2-digit'}),
       createdAt: serverTimestamp(),
       views: 0,
       comments: [] 
     });
     alert("후기 등록 완료!");
     
     // ✅ 추가: 메인 페이지와 연동을 위해 데이터 새로고침 지시
     router.refresh(); 

     setInputTitle(""); setInputContent(""); setInputAuthor(""); setInputPassword("");
     setViewState('list');
     fetchReviews(); 
   } catch (e) { alert("오류가 발생했습니다."); }
 };

 // 3. 상세보기
 const handleReadReview = async (review: Review) => {
   const reviewRef = doc(db, "reviews", review.id);
   await updateDoc(reviewRef, { views: increment(1) });
   const newDoc = await getDoc(reviewRef);
   if (newDoc.exists()) { setSelectedReview({ id: newDoc.id, ...newDoc.data() } as Review); }
   setViewState('detail');
 };

 // 4. 댓글 등록
 const handleAddComment = async () => {
   if (!selectedReview || !commentAuthor || !commentContent) return alert("내용을 입력해주세요.");
   const newComment = { author: commentAuthor, content: commentContent, date: new Date().toLocaleDateString('ko-KR', {month: '2-digit', day: '2-digit'}) };
   try {
     const reviewRef = doc(db, "reviews", selectedReview.id);
     await updateDoc(reviewRef, { comments: arrayUnion(newComment) });
     setSelectedReview(prev => prev ? { ...prev, comments: [...(prev.comments || []), newComment] } : null);
     setCommentContent(""); 
   } catch (e) { alert("댓글 등록 실패"); }
 };

 return (
   <div className="min-h-screen bg-slate-50 text-gray-800 p-4 md:p-8 font-sans">
     <div className="max-w-5xl mx-auto">
       <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
         <div>
           <h1 className="text-3xl font-black text-gray-900 mb-1">📢 이용후기</h1>
           <p className="text-gray-500 text-sm">고객님들의 100% 리얼 거래 후기</p>
         </div>
         {viewState === 'list' ? (
           <button onClick={() => setViewState('write')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-md flex items-center gap-2"><PenTool size={18}/> 후기 쓰기</button>
         ) : (
           <button onClick={() => {setViewState('list'); fetchReviews();}} className="bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg font-bold flex items-center gap-1 transition"><ArrowLeft size={18}/> 목록으로</button>
         )}
       </div>

       {/* [1] 목록 화면 - 검색창 삭제됨 */}
       {viewState === 'list' && (
         <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm text-sm md:text-base">
           <table className="w-full text-center">
             <thead className="bg-gray-50 text-gray-600 border-b border-gray-200 font-bold">
               <tr>
                 <th className="py-4 w-14 md:w-20">번호</th>
                 <th className="py-4 w-20 md:w-32">서버</th>
                 <th className="py-4 text-left pl-4">제목</th>
                 <th className="py-4 w-20 md:w-32">작성자</th>
                 <th className="py-4 w-14 md:w-20">조회</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {reviews.map((review, index) => (
                 <tr key={review.id} onClick={() => handleReadReview(review)} className="hover:bg-blue-50/50 cursor-pointer transition">
                   <td className="py-4 text-gray-400">{reviews.length - index}</td>
                   <td className="py-4">
                     {/* ✅ 서버 표시 */}
                     <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-bold border border-gray-200">
                       {review.server}
                     </span>
                   </td>
                   <td className="py-4 text-left pl-4 font-bold text-gray-800">
                     {review.title} {review.comments?.length > 0 && <span className="text-blue-500 text-xs ml-1">[{review.comments.length}]</span>}
                   </td>
                   <td className="py-4 text-gray-500 text-xs md:text-sm">{review.author}</td>
                   <td className="py-4 text-gray-400 text-xs md:text-sm">{review.views}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       )}

       {/* [2] 글쓰기 화면 - 서버 선택 기능 추가됨 */}
       {viewState === 'write' && (
         <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-lg max-w-2xl mx-auto">
           <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><PenTool className="text-blue-600"/> 후기 작성</h2>
           <div className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
               <div>
                 <label className="block font-bold text-sm mb-1 text-gray-700">서버 선택</label>
                 {/* ✅ 서버 선택 드롭다운 */}
                 <select 
                   value={inputServer} 
                   onChange={(e)=>setInputServer(e.target.value)} 
                   className="w-full bg-gray-50 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                 >
                   {SERVERS.map(s => <option key={s} value={s}>{s}</option>)}
                 </select>
               </div>
               <div>
                 <label className="block font-bold text-sm mb-1 text-gray-700">닉네임</label>
                 <input value={inputAuthor} onChange={(e)=>setInputAuthor(e.target.value)} placeholder="닉네임" className="w-full bg-gray-50 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"/>
               </div>
             </div>
             <input value={inputTitle} onChange={(e)=>setInputTitle(e.target.value)} placeholder="제목" className="w-full bg-gray-50 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 font-bold"/>
             <textarea value={inputContent} onChange={(e)=>setInputContent(e.target.value)} placeholder="내용을 입력하세요." className="w-full h-48 bg-gray-50 p-4 rounded-lg border border-gray-300 outline-none resize-none focus:ring-2 focus:ring-blue-500"></textarea>
             <button onClick={handleWriteSubmit} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1">등록하기</button>
           </div>
         </div>
       )}

       {/* [3] 상세보기 화면 */}
       {viewState === 'detail' && selectedReview && (
         <div className="max-w-4xl mx-auto">
           <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
             <div className="bg-gray-50/80 border-b border-gray-200 p-8">
               <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider mb-3 inline-block">
                 {selectedReview.server}
               </span>
               <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">{selectedReview.title}</h2>
               <div className="flex justify-between items-center text-gray-500 text-sm">
                 <div className="flex gap-4"><span><User size={16} className="inline mr-1"/>{selectedReview.author}</span><span><Calendar size={16} className="inline mr-1"/>{selectedReview.date}</span></div>
                 <span><Eye size={16} className="inline mr-1"/>{selectedReview.views}</span>
               </div>
             </div>
             <div className="p-8 min-h-[150px] text-gray-800 leading-relaxed whitespace-pre-line text-lg">{selectedReview.content}</div>
           </div>
           <div className="bg-white rounded-2xl border border-gray-200 p-8">
             <h3 className="font-bold text-xl mb-6">💬 댓글 {selectedReview.comments?.length || 0}</h3>
             <div className="space-y-4 mb-6">
               {selectedReview.comments?.map((c, i) => (
                 <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                   <div className="flex justify-between mb-2"><span className="font-bold text-gray-900">{c.author}</span><span className="text-xs text-gray-400">{c.date}</span></div>
                   <p className="text-gray-700">{c.content}</p>
                 </div>
               ))}
             </div>
             <div className="flex gap-2">
               <input value={commentAuthor} onChange={(e)=>setCommentAuthor(e.target.value)} placeholder="닉네임" className="w-1/4 bg-gray-50 p-3 rounded-lg border border-gray-300 outline-none text-sm"/>
               <input value={commentContent} onChange={(e)=>setCommentContent(e.target.value)} placeholder="댓글 내용" className="flex-1 bg-gray-50 p-3 rounded-lg border border-gray-300 outline-none text-sm" onKeyDown={(e)=>e.key==='Enter'&&handleAddComment()}/>
               <button onClick={handleAddComment} className="bg-blue-600 text-white px-6 rounded-lg font-bold">등록</button>
             </div>
           </div>
         </div>
       )}
     </div>
   </div>
 );
}