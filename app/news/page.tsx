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

  // 카테고리별 텍스트 색상 (배경색 대신 글자색으로 깔끔하게)
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "공지": return "text-red-500 font-bold"; // 공지는 빨간색 강조
      case "이벤트": return "text-blue-600 font-bold";
      case "패치": return "text-purple-600 font-bold";
      case "점검": return "text-orange-500 font-bold";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 min-h-screen">
      {/* 상단 제목 영역 */}
      <div className="mb-6 border-b-2 border-gray-900 pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📢 메이플 이슈</h1>
          <p className="text-sm text-gray-500 mt-1">메이플스토리의 주요 소식을 빠르게 확인하세요.</p>
        </div>
      </div>

      {/* 게시글 리스트 영역 */}
      <div className="bg-white border-t border-gray-200">
        {newsList.length === 0 ? (
          <div className="text-center py-20 text-gray-400 border-b border-gray-200">
            등록된 게시글이 없습니다.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {newsList.map((item) => (
              <li key={item.id} className="hover:bg-gray-50 transition duration-150">
                <Link href={`/news/${item.id}`} className="block px-2 py-4 sm:px-4">
                  <div className="flex items-start justify-between">
                    
                    {/* 왼쪽: 내용 영역 */}
                    <div className="flex-1 min-w-0">
                      {/* 1줄: 카테고리 + 제목 */}
                      <div className="flex items-center gap-2 mb-1.5">
                        {/* 카테고리 뱃지 */}
                        <span className={`flex-shrink-0 text-sm ${getCategoryColor(item.category)}`}>
                          [{item.category || "공지"}]
                        </span>
                        {/* 제목 */}
                        <h2 className="text-base sm:text-lg font-medium text-gray-900 truncate pr-4">
                          {item.title}
                        </h2>
                        {/* (새 글 표시 - 오늘 날짜면 N 띄우기 기능 추가) */}
                        {item.date === new Date().toLocaleDateString('ko-KR') && (
                           <span className="w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-sm font-bold">N</span>
                        )}
                      </div>

                      {/* 2줄: 관리자 아이콘 + 날짜 */}
                      <div className="flex items-center text-xs sm:text-sm text-gray-400 gap-3">
                        <div className="flex items-center gap-1">
                          {/* M 아이콘 (관리자 표시) */}
                          <div className="w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                            M
                          </div>
                          <span className="font-medium text-gray-600">관리자</span>
                        </div>
                        <span className="w-px h-3 bg-gray-300"></span> {/* 구분선 */}
                        <span>{item.date}</span>
                      </div>
                    </div>

                    {/* 오른쪽: 썸네일 영역 (이미지가 없을 땐 빈 공간 or 로고) */}
                    {/* 현재는 이미지가 없으므로 공간만 유지하거나 숨김 처리 */}
                    {/* <div className="ml-4 flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md border border-gray-200"></div> */}
                    
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* 하단 더보기 버튼 등 (필요시 추가) */}
      <div className="border-t border-gray-200"></div>
    </div>
  );
}