"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import ReviewWriteSection from "./ReviewWriteSection";

interface Review {
  id: string;
  title: string;
  author: string;
  server: string;
  date: string;
  views: number;
  comments?: unknown[];
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ 실시간 구독 대신 1회 로드 + 낙관적 업데이트 방식
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        setReviews(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Review[]);
      } catch (e) {
        console.error("후기 로딩 실패", e);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // ✅ 낙관적 업데이트: 새 후기 추가 시 즉시 목록에 반영
  const handleReviewAdded = (newReview: Review) => {
    setReviews(prev => [newReview, ...prev]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">📢 이용후기</h1>
            <p className="text-gray-500 text-sm">고객님들의 실제 거래 후기</p>
          </div>
          <ReviewWriteSection onReviewAdded={handleReviewAdded} />
        </div>

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
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-gray-400">아직 등록된 후기가 없습니다.</td>
                </tr>
              ) : (
                reviews.map((review, index) => (
                  <tr key={review.id} className="hover:bg-blue-50/50 transition">
                    <td className="py-4 text-gray-400">{reviews.length - index}</td>
                    <td className="py-4">
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-bold border border-gray-200">
                        {review.server}
                      </span>
                    </td>
                    <td className="py-4 text-left pl-4">
                      <Link href={`/reviews/${review.id}`} className="font-bold text-gray-800 hover:text-blue-600 transition">
                        {review.title}
                        {review.comments && review.comments.length > 0 && (
                          <span className="text-blue-500 text-xs ml-1">[{review.comments.length}]</span>
                        )}
                      </Link>
                    </td>
                    <td className="py-4 text-gray-500 text-xs md:text-sm">{review.author}</td>
                    <td className="py-4 text-gray-400 text-xs md:text-sm">{review.views || 0}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
