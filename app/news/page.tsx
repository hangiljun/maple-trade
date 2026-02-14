import Link from "next/link";
import { Megaphone, Calendar, AlertCircle } from "lucide-react";

export default function NewsPage() {
  // 뉴스 데이터 (가짜 데이터)
  const newsItems = [
    { id: 1, type: "공지", title: "2/10(화) 아르테일 월드 무중단 패치 안내", date: "2026.02.10", view: 1542 },
    { id: 2, type: "이벤트", title: "\"복과 행운이 찾아오는 설날\" 이벤트 안내", date: "2026.02.06", view: 3200 },
    { id: 3, type: "패치", title: "2/6(금) 아르테일 월드 업데이트 패치 노트", date: "2026.02.06", view: 2100 },
    { id: 4, type: "점검", title: "2/6(금) 정기 점검 안내 (오전 9시 ~ 낮 1시)", date: "2026.02.03", view: 890 },
    { id: 5, type: "이슈", title: "최근 메이플스토리 큐브 확률 관련 이슈 정리", date: "2026.01.31", view: 5600 },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-8 border-b pb-4">
        <div>
           <h1 className="text-3xl font-bold text-gray-900 mb-2">메이플 이슈</h1>
           <p className="text-gray-500">메이플스토리 최신 뉴스와 업데이트 정보를 확인하세요.</p>
        </div>
      </div>

      {/* 뉴스 리스트 (게시판 형태) */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* 헤더 (PC 전용) */}
        <div className="hidden md:flex bg-gray-50 border-b py-3 text-sm font-bold text-gray-500 text-center">
          <div className="w-20">구분</div>
          <div className="flex-1 text-left px-4">제목</div>
          <div className="w-32">작성일</div>
          <div className="w-20">조회</div>
        </div>

        {/* 리스트 아이템 */}
        <ul>
          {newsItems.map((item) => (
            <li key={item.id} className="border-b last:border-0 hover:bg-blue-50 transition cursor-pointer group">
              <div className="flex flex-col md:flex-row md:items-center py-4 px-2 md:py-3 text-sm">
                
                {/* 모바일용 뱃지 & 날짜 표시 */}
                <div className="md:hidden flex justify-between mb-2 px-2">
                   <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      item.type === "공지" ? "bg-red-100 text-red-600" :
                      item.type === "이벤트" ? "bg-purple-100 text-purple-600" :
                      item.type === "점검" ? "bg-gray-200 text-gray-600" :
                      "bg-blue-100 text-blue-600"
                    }`}>
                      {item.type}
                    </span>
                   <span className="text-gray-400 text-xs">{item.date}</span>
                </div>

                {/* PC용 구분 */}
                <div className="hidden md:block w-20 text-center">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      item.type === "공지" ? "bg-red-100 text-red-600" :
                      item.type === "이벤트" ? "bg-purple-100 text-purple-600" :
                      item.type === "점검" ? "bg-gray-200 text-gray-600" :
                      "bg-blue-100 text-blue-600"
                    }`}>
                      {item.type}
                    </span>
                </div>

                {/* 제목 */}
                <div className="flex-1 px-4 text-gray-800 font-medium group-hover:text-blue-600 truncate">
                  {item.title}
                  {/* 새 글 표시 (조건부) */}
                  {item.id <= 2 && <span className="ml-2 text-[10px] text-red-500 border border-red-200 bg-red-50 px-1 rounded">N</span>}
                </div>

                {/* 날짜 및 조회수 (PC) */}
                <div className="hidden md:block w-32 text-center text-gray-500 text-xs">{item.date}</div>
                <div className="hidden md:block w-20 text-center text-gray-400 text-xs">{item.view.toLocaleString()}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* 페이지네이션 (디자인용) */}
      <div className="flex justify-center mt-8 gap-2">
        <button className="px-3 py-1 border rounded hover:bg-gray-50 text-gray-500">&lt;</button>
        <button className="px-3 py-1 bg-blue-600 text-white rounded font-bold">1</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-50 text-gray-500">2</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-50 text-gray-500">3</button>
        <button className="px-3 py-1 border rounded hover:bg-gray-50 text-gray-500">&gt;</button>
      </div>
    </div>
  );
}