export default function NewsPage() {
  // 나중에 관리자 페이지에서 등록하면 이 리스트에 추가됩니다.
  const newsList = [
    { id: 1, title: "이번 주 메이플스토리 패치 노트 요약", date: "2026.02.14", category: "업데이트" },
    { id: 2, title: "주목해야 할 급등 아이템 TOP 5", date: "2026.02.12", category: "시세정보" },
    { id: 3, title: "메이플스토리 보안 강화 캠페인 안내", date: "2026.02.10", category: "공지사항" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">메이플 이슈</h2>
        <p className="text-gray-500">메이플스토리의 최신 소식과 시세 동향을 확인하세요.</p>
      </div>

      <div className="space-y-4">
        {newsList.map((news) => (
          <div key={news.id} className="group border-b border-gray-50 pb-6 hover:bg-gray-50 p-4 rounded-xl transition cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold px-2 py-1 bg-orange-100 text-orange-600 rounded">
                {news.category}
              </span>
              <span className="text-sm text-gray-400">{news.date}</span>
            </div>
            <h3 className="text-xl font-bold group-hover:text-orange-500 transition">
              {news.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}