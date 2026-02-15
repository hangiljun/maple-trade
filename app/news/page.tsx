"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNewsList(data);
    });
    return () => unsubscribe();
  }, []);

  // 카테고리별 뱃지 색상 함수
  const getBadgeColor = (category: string) => {
    switch (category) {
      case "공지": return "bg-gray-800 text-white";
      case "이벤트": return "bg-green-100 text-green-700 border-green-200";
      case "패치": return "bg-blue-100 text-blue-700 border-blue-200";
      case "점검": return "bg-red-100 text-red-700 border-red-200";
      case "이슈": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">📢 메이플 이슈</h1>
        <p className="text-gray-500">메이플스토리의 최신 소식과 꿀팁을 확인하세요.</p>
      </div>

      <div className="space-y-3">
        {newsList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-400">
            등록된 게시글이 없습니다.
          </div>
        ) : (
          newsList.map((item) => (
            <Link 
              href={`/news/${item.id}`} // 클릭 시 상세 페이지로 이동
              key={item.id} 
              className="block group bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition duration-200"
            >
              <div className="flex items-center gap-3 mb-2">
                {/* 카테고리 뱃지 */}
                <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getBadgeColor(item.category)}`}>
                  {item.category || "공지"}
                </span>
                <span className="text-sm text-gray-400">{item.date}</span>
              </div>
              
              <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition truncate">
                {item.title}
              </h2>
              {/* 조회수는 요청하신 대로 제거했습니다. */}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}