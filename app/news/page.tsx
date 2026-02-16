import React from "react";
import Link from 'next/link';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import type { Metadata } from "next";

// 📝 [SEO 입력 구간 2] 뉴스 페이지 제목과 설명
export const metadata: Metadata = {
  title: "메이플 이슈 & 뉴스 - 업데이트 및 공지사항",
  description: "메이플스토리 최신 업데이트, 이벤트 소식, 패치 노트 및 점검 정보를 가장 빠르게 확인하세요.",
};

export default async function NewsPage() {
  // ✅ [수정 포인트] 여기에 ': any[]'를 붙여서 타입을 명확히 해줬습니다!
  // 이제 빨간 줄이 사라집니다.
  let newsList: any[] = [];
  
  try {
    const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    newsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("뉴스 로딩 실패:", error);
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "공지": return "text-red-500 font-bold";
      case "이벤트": return "text-blue-600 font-bold";
      case "패치": return "text-purple-600 font-bold";
      case "점검": return "text-orange-500 font-bold";
      default: return "text-gray-500";
    }
  };

  const today = new Date().toLocaleDateString('ko-KR');

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
            {/* ✅ 혹시 몰라 여기 item에도 :any를 붙여 안전하게 처리했습니다 */}
            {newsList.map((item: any) => (
              <li key={item.id} className="hover:bg-gray-50 transition duration-150">
                <Link href={`/news/${item.id}`} className="block px-2 py-4 sm:px-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`flex-shrink-0 text-sm ${getCategoryColor(item.category)}`}>[{item.category || "공지"}]</span>
                        <h2 className="text-base sm:text-lg font-medium text-gray-900 truncate pr-4">{item.title}</h2>
                        {item.date === today && <span className="w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-sm font-bold">N</span>}
                      </div>
                      <div className="flex items-center text-xs sm:text-sm text-gray-400 gap-3">
                        <div className="flex items-center gap-1.5">
                          {/* 이미지는 public 폴더에 있어야 함 */}
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
                          // ✅ alt 태그에 제목 넣음 (SEO 필수)
                          <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
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