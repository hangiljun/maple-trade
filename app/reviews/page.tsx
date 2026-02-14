"use client";

import { useState } from "react";
import { Star, User, Send } from "lucide-react";

export default function ReviewsPage() {
  // 가짜 데이터 (초기 후기들)
  const [reviews, setReviews] = useState([
    { id: 1, name: "비숍조아", content: "새벽인데도 바로 칼답해주셔서 놀랐어요. 감사합니다!", date: "2026.02.14", rating: 5 },
    { id: 2, name: "히어로99", content: "급처템이라 가격 걱정했는데 시세보다 훨씬 잘 쳐주시네요.", date: "2026.02.13", rating: 5 },
    { id: 3, name: "메린이", content: "첫 거래라 무서웠는데 친절하게 알려주셔서 성공했습니다.", date: "2026.02.13", rating: 4 },
  ]);

  const [newReview, setNewReview] = useState("");
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview || !nickname) return alert("닉네임과 내용을 입력해주세요!");

    const review = {
      id: Date.now(),
      name: nickname,
      content: newReview,
      date: new Date().toLocaleDateString(),
      rating: 5,
    };

    setReviews([review, ...reviews]); // 새 글을 맨 위에 추가
    setNewReview("");
    setNickname("");
    alert("후기가 등록되었습니다!");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">이용후기</h1>

      {/* 후기 작성 폼 */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 mb-12">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
          후기 작성하기
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <input 
              type="text" 
              placeholder="닉네임" 
              className="border p-3 rounded-lg w-1/3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div className="flex items-center gap-1 text-yellow-400">
               <Star fill="currentColor" />
               <Star fill="currentColor" />
               <Star fill="currentColor" />
               <Star fill="currentColor" />
               <Star fill="currentColor" />
            </div>
          </div>
          <textarea 
            rows={3}
            placeholder="거래 후기를 남겨주세요. (욕설 및 비방은 삭제될 수 있습니다.)"
            className="w-full border p-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2">
            <Send size={18} /> 후기 등록하기
          </button>
        </form>
      </div>

      {/* 후기 리스트 */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-xl border hover:shadow-md transition">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User size={20} className="text-gray-500" />
                </div>
                <div>
                  <span className="font-bold text-gray-900 block">{review.name}</span>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mt-2 pl-12">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}