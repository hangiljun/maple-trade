"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PenTool, ArrowLeft } from "lucide-react";
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SERVERS = ["챌린저스", "루나", "스카니아", "엘리시움", "크로아", "베라", "오로라", "기타서버", "에오스"];

interface ReviewWriteSectionProps {
  onReviewAdded?: (newReview: any) => void; // 낙관적 업데이트용 콜백
}

export default function ReviewWriteSection({ onReviewAdded }: ReviewWriteSectionProps) {
  const router = useRouter();
  const [isWriting, setIsWriting] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [inputAuthor, setInputAuthor] = useState("");
  const [inputServer, setInputServer] = useState("루나");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const title = inputTitle.trim().slice(0, 100);
    const content = inputContent.trim().slice(0, 2000);
    const author = inputAuthor.trim().slice(0, 20);
    if (!title || !content || !author) return alert("내용을 입력해주세요.");

    setSubmitting(true);

    try {
      const newReviewData = {
        title,
        content,
        author,
        server: inputServer,
        date: new Date().toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' }),
        createdAt: serverTimestamp(),
        views: 0,
        comments: [],
      };

      // Firestore에 저장
      const docRef = await addDoc(collection(db, "reviews"), newReviewData);

      // ✅ 낙관적 업데이트: 부모 컴포넌트에 즉시 알림
      if (onReviewAdded) {
        onReviewAdded({
          id: docRef.id,
          ...newReviewData,
          createdAt: new Date() // 임시로 현재 시간 사용
        });
      }

      alert("후기 등록 완료!");
      setInputTitle("");
      setInputContent("");
      setInputAuthor("");
      setInputServer("루나");
      setIsWriting(false);

      // ✅ router.refresh() 제거 - 낙관적 업데이트로 즉시 반영
      // router.refresh(); // ❌ 이게 15초 지연의 원인!

      // 3초 후 백그라운드에서 조용히 새로고침 (선택사항)
      setTimeout(() => {
        router.refresh();
      }, 3000);

    } catch (error) {
      console.error("후기 작성 실패:", error);
      alert("오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isWriting) {
    return (
      <button
        onClick={() => setIsWriting(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-md flex items-center gap-2 transition"
      >
        <PenTool size={18} /> 후기 쓰기
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) setIsWriting(false); }}>
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <PenTool className="text-blue-600" /> 후기 작성
          </h2>
          <button onClick={() => setIsWriting(false)} className="text-gray-400 hover:text-gray-600">
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-sm mb-1 text-gray-700">서버 선택</label>
              <select
                value={inputServer}
                onChange={(e) => setInputServer(e.target.value)}
                className="w-full bg-gray-50 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {SERVERS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-bold text-sm mb-1 text-gray-700">닉네임</label>
              <input
                value={inputAuthor}
                onChange={(e) => setInputAuthor(e.target.value)}
                placeholder="닉네임"
                className="w-full bg-gray-50 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <input
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="제목"
            className="w-full bg-gray-50 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 font-bold"
          />
          <textarea
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="내용을 입력하세요."
            className="w-full h-48 bg-gray-50 p-4 rounded-lg border border-gray-300 outline-none resize-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setIsWriting(false)}
              className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-50 transition"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {submitting ? "등록 중..." : "등록하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
