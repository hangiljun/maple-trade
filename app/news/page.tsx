"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore'; // ✅ getDocs 사용

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    // ✅ 비용 절감을 위해 실시간 감시(onSnapshot) 대신 한 번만 불러오기(getDocs) 사용
    const fetchNews = async () => {
      try {
        const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setNewsList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("뉴스 로딩 실패:", error);
      }
    };
    
    fetchNews();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "공지": return "text-red-500 font-bold";
      case "이벤트": return "text-blue-600 font-bold";
      case "패치": return "text-purple-600 font-bold";
      case "점검": return "text-orange-500 font-bold";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 min-h-screen">
      <div className="mb-6 border-b-2 border-gray-900 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">📢 메이플 이슈</h1>
        <p className="text-sm text-gray-500 mt-1">최신 소식을 확인하세요.</p>
      </div>

      <div className="bg-white border-t border-gray-200">
        {newsList.length === 0 ? (
          <div className="text-center py-20 text-gray-400">등록된 게시글이 없습니다.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {newsList.map((item) => (
              <li key={item.id} className="hover:bg-gray-50 transition duration-150">
                <Link href={`/news/${item.id}`} className="block px-2 py-4 sm:px-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`flex-shrink-0 text-sm ${getCategoryColor(item.category)}`}>[{item.category || "공지"}]</span>
                        <h2 className="text-base sm:text-lg font-medium text-gray-900 truncate pr-4">{item.title}</h2>
                        {item.date === new Date().toLocaleDateString('ko-KR') && <span className="w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-sm font-bold">N</span>}
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-400 gap-3">
                        <div className="flex items-center gap-1.5">
                          <img src="/favicon.ico" alt="admin" className="w-4 h-4 rounded-full border border-gray-200" />
                          <span className="font-medium text-gray-600">관리자</span>
                        </div>
                        <span className="w-px h-3 bg-gray-300"></span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                    {item.thumbnail && (
                      <div className="flex-shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                        {item.fileType === 'video' ? (
                          <video src={item.thumbnail} className="w-full h-full object-cover" muted />
                        ) : (
                          <img src={item.thumbnail} alt="thumb" className="w-full h-full object-cover" />
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="border-t border-gray-200"></div>
    </div>
  );
}