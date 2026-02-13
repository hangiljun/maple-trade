export default function ReviewsPage() {
  const reviews = [
    { id: 1, author: "루나유저", content: "처음인데 진짜 5분 만에 입금해주셔서 놀랐어요!", date: "2분 전", rating: "⭐⭐⭐⭐⭐" },
    { id: 2, author: "스카냐왕", content: "시세도 잘 쳐주시고 친절하십니다. 단골 될 것 같아요.", date: "1시간 전", rating: "⭐⭐⭐⭐⭐" },
    { id: 3, author: "메린이", content: "복잡할 줄 알았는데 상담원분이 잘 알려주셔서 쉽게 거래했습니다.", date: "어제", rating: "⭐⭐⭐⭐" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-2">이용후기</h2>
          <p className="text-gray-500">실제 거래하신 유저분들의 소중한 후기입니다.</p>
        </div>
        <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-gray-800 transition">
          후기 작성하기
        </button>
      </div>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
            <div className="flex justify-between mb-4">
              <span className="font-bold">{review.author}</span>
              <span className="text-orange-400">{review.rating}</span>
            </div>
            <p className="text-gray-700 mb-4 leading-relaxed">"{review.content}"</p>
            <span className="text-sm text-gray-400">{review.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}