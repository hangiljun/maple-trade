export default function Home() {
  return (
    <div className="space-y-16">
      {/* 메인 홍보 구역 */}
      <section className="py-20 text-center bg-gradient-to-b from-orange-50 to-white rounded-3xl">
        <h2 className="text-5xl font-extrabold mb-6 tracking-tight">
          잠자는 아이템, <span className="text-orange-500">현금</span>으로 바꾸세요.
        </h2>
        <p className="text-xl text-gray-500 mb-10">업계 최고가 매입, 5분 이내 신속 입금 시스템</p>
        <div className="flex justify-center gap-4">
          <button className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-lg hover:bg-orange-600 transition">
            급처템 판매 상담하기 (카톡)
          </button>
        </div>
      </section>

      {/* 장점 홍보 구역 */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="p-8 border border-gray-100 rounded-3xl bg-gray-50/50 text-center">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-bold mb-2">초고속 진행</h3>
          <p className="text-gray-500">아이템 확인 후 즉시 입금 절차를 진행합니다.</p>
        </div>
        <div className="p-8 border border-gray-100 rounded-3xl bg-gray-50/50 text-center">
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="text-xl font-bold mb-2">안전 거래</h3>
          <p className="text-gray-500">수천 건의 후기가 증명하는 신뢰도 1위 사이트입니다.</p>
        </div>
        <div className="p-8 border border-gray-100 rounded-3xl bg-gray-50/50 text-center">
          <div className="text-4xl mb-4">💰</div>
          <h3 className="text-xl font-bold mb-2">정직한 시세</h3>
          <p className="text-gray-500">거품 없는 정직한 시세로 최고가를 약속합니다.</p>
        </div>
      </div>
    </div>
  );
}