import React from "react";
import Link from "next/link";
import { db } from '../../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { Metadata } from "next";
import ReviewWriteSection from "./ReviewWriteSection";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "이용후기 - 메이플급처 실거래 고객 후기 | 메이플 급처템 안전거래",
  description: "메이플급처에서 실제 거래하신 고객님들의 리얼 후기를 확인하세요. 스카니아, 루나, 엘리시움 등 전 서버 후기 모음. 평균 5분 이내 거래 완료.",
  keywords: ["메이플급처 후기", "메이플 아이템 거래 후기", "메소 거래 후기", "메이플급처 리뷰", "메이플 안전거래 후기"],
  openGraph: {
    title: "이용후기 - 메이플급처",
    description: "실제 고객님들의 거래 후기",
    url: "https://www.메이플급처.com/reviews",
  },
  alternates: {
    canonical: "https://www.메이플급처.com/reviews",
  },
};

interface Review {
  id: string;
  title: string;
  author: string;
  server: string;
  date: string;
  views: number;
  comments?: unknown[];
}

export default async function ReviewsPage() {
  let reviews: Review[] = [];

  try {
    const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    reviews = snap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Review[];
  } catch (e) {
    console.error("후기 로딩 실패", e);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">📢 이용후기</h1>
            <p className="text-gray-500 text-sm">고객님들의 실제 거래 후기</p>
          </div>
          <ReviewWriteSection />
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
