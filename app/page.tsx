import React from 'react';

export default function MapleTradePage() {
  const kakaoLink = "https://open.kakao.com/o/sKg86b7f";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-white font-sans text-gray-800">
      {/* 상단 헤더 영역 */}
      <header className="pt-16 pb-12 px-4 text-center">
        <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm mb-6">
          <span className="text-blue-500 font-bold">Maple Quick Deal</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-gray-900 leading-tight">
          잠자는 아이템, <br />
          <span className="text-orange-500">현금</span>으로 바꾸세요.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 font-medium">
          업계 최고가 매입, 5분 이내 신속 입금 시스템
        </p>

        {/* 카톡 상담 버튼 */}
        <a 
          href={kakaoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-black text-xl font-black px-10 py-5 rounded-full shadow-[0_6px_0_rgb(202,138,4)] active:translate-y-1 active:shadow-none transition-all"
        >
          ⭐ 실시간 카톡 상담하기 ⭐
        </a>
      </header>

      {/* 특징 소개 (카드 섹션) */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 카드 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border-b-8 border-blue-400 hover:-translate-y-2 transition-transform">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-2xl font-bold mb-3">초고속 진행</h3>
            <p className="text-gray-500 leading-relaxed">아이템 확인 후 즉시 입금 절차를 진행합니다. 기다림 없는 시원한 거래!</p>
          </div>

          {/* 카드 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border-b-8 border-yellow-400 hover:-translate-y-2 transition-transform">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold mb-3">안전 거래</h3>
            <p className="text-gray-500 leading-relaxed">수천 건의 후기가 증명하는 신뢰도 1위 사이트입니다. 사고 걱정 ZERO!</p>
          </div>

          {/* 카드 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border-b-8 border-orange-400 hover:-translate-y-2 transition-transform">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-2xl font-bold mb-3">정직한 시세</h3>
            <p className="text-gray-500 leading-relaxed">거품 없는 정직한 시세로 업계 최고가를 약속합니다. 비교 후 선택하세요!</p>
          </div>

        </div>
      </main>

      {/* 푸터 영역 */}
      <footer className="py-12 text-center text-gray-400 text-sm border-t border-gray-100 mt-20">
        <p className="mb-2">© 2026 메이플급처.com All Rights Reserved.</p>
        <p>본 사이트는 안전한 거래 문화를 지향합니다.</p>
      </footer>
    </div>
  );
}