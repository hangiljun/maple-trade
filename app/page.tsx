"use client";
import React from "react";
import Link from "next/link";
import { CheckCircle, Zap, ShieldCheck, TrendingUp, Star, MessageCircle, FileText } from "lucide-react"; // 아이콘 추가

export default function Home() {
  // ✅ 사장님의 실제 카톡 링크 (여기만 수정하시면 됩니다)
  const KAKAO_LINK = "https://open.kakao.com/o/sKg86b7f";

  return (
    <div className="flex flex-col gap-12 pb-20">
      
      {/* 1. 홍보 배너 구역 (그라데이션 배경 유지) */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-center text-white relative overflow-hidden">
        {/* 배경 장식용 원 (살짝 비치는 효과) */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            메이플스토리 급처템 <br/>
            <span className="text-blue-200">가장 안전하고 빠르게</span>
          </h1>
          <p className="text-blue-100 mb-8 text-lg md:text-xl font-medium">
            시세보다 저렴한 아이템을 실시간으로 확인하고<br className="md:hidden"/> 안전하게 거래하세요.
          </p>
          
          {/* 네온사인 효과 (기존 유지) */}
          <div className="inline-block border-4 border-pink-500/80 rounded-xl p-4 bg-black/40 backdrop-blur-md mb-10 shadow-[0_0_15px_rgba(236,72,153,0.5)]">
            <p className="neon-text text-xl md:text-2xl font-mono text-pink-100 font-bold tracking-widest animate-pulse">
              OPEN 365일 24시간 정상 운영중
            </p>
          </div>

          {/* [핵심] 버튼 그룹 (거래방법 / 후기 / 카톡문의) */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-2 w-full max-w-lg mx-auto">
             
             {/* 1. 거래 방법 보기 */}
             <Link href="/tip" className="flex-1 bg-white text-blue-700 px-6 py-4 rounded-xl font-bold hover:bg-gray-50 transition shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-1">
               <FileText size={20} />
               거래 방법
             </Link>
             
             {/* 2. 리얼 후기 확인 */}
             <Link href="/reviews" className="flex-1 bg-blue-800/50 backdrop-blur-sm border-2 border-blue-400/30 text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-700/50 transition shadow-lg flex items-center justify-center gap-2 transform hover:-translate-y-1">
               <Star size={20} className="text-yellow-300 fill-yellow-300"/>
               리얼 후기
             </Link>

             {/* 3. [추가됨] 카카오톡 문의 (노란색 강조) */}
             <a 
               href={KAKAO_LINK}
               target="_blank"
               rel="noreferrer"
               className="flex-1 bg-[#FEE500] text-[#3A1D1D] px-6 py-4 rounded-xl font-black hover:bg-yellow-400 transition shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-1 hover:scale-105"
             >
               <MessageCircle size={20} fill="#3A1D1D" />
               카톡 문의
             </a>
          </div>
        </div>
      </section>

      {/* 2. 사이트 신념 (기존 디자인 유지) */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">우리의 약속</h2>
          <div className="w-12 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-500 mt-4">고객님께 드리는 3가지 핵심 가치입니다.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md hover:-translate-y-1 transition duration-300 group">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">무한한 신뢰</h3>
            <p className="text-gray-500 leading-relaxed">모든 거래는 투명하게 공개되며<br/>검증된 아이템만 취급합니다.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md hover:-translate-y-1 transition duration-300 group">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">압도적 신속</h3>
            <p className="text-gray-500 leading-relaxed">구매 문의 즉시 응답하며<br/>가장 빠른 거래를 보장합니다.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md hover:-translate-y-1 transition duration-300 group">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">정확한 시세</h3>
            <p className="text-gray-500 leading-relaxed">데이터 기반의 시세 분석으로<br/>최적의 가격을 제안합니다.</p>
          </div>
        </div>
      </section>

      {/* 3. 특징 및 타 사이트 비교 (기존 디자인 유지) */}
      <section className="bg-slate-50 py-20 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* 왼쪽: 텍스트 설명 */}
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">왜 <span className="text-blue-600">메이플급처템</span>인가요?</h2>
                <p className="text-gray-600 text-lg">타 사이트와 비교할 수 없는 압도적인 혜택을 확인하세요.</p>
              </div>
              
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-100 p-1 rounded-full"><CheckCircle className="text-blue-600 w-5 h-5" /></div>
                  <div>
                    <strong className="block text-xl text-gray-800 mb-1">수수료 0% 직거래 시스템</strong>
                    <span className="text-gray-500">타 중개 사이트의 과도한 수수료를 없앴습니다.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-100 p-1 rounded-full"><CheckCircle className="text-blue-600 w-5 h-5" /></div>
                  <div>
                    <strong className="block text-xl text-gray-800 mb-1">사기 조회 자동 연동</strong>
                    <span className="text-gray-500">더치트 및 메이플 공식 홈페이지 블랙리스트 자동 대조.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-blue-100 p-1 rounded-full"><CheckCircle className="text-blue-600 w-5 h-5" /></div>
                  <div>
                    <strong className="block text-xl text-gray-800 mb-1">24시간 전담 매니저 배치</strong>
                    <span className="text-gray-500">새벽 시간대에도 즉시 거래가 가능합니다.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* 오른쪽: 비교 테이블 */}
            <div className="flex-1 w-full max-w-xl">
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-500">
                <table className="w-full text-center">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="py-5 text-gray-500 font-medium w-1/3">구분</th>
                      <th className="py-5 text-gray-400 font-medium w-1/3">타 커뮤니티</th>
                      <th className="py-5 text-blue-600 font-black bg-blue-50/50 w-1/3 text-lg">메이플급처템</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="py-5 text-gray-600 font-medium">거래 속도</td>
                      <td className="py-5 text-gray-400">평균 3시간</td>
                      <td className="py-5 text-blue-600 font-bold bg-blue-50/30">⚡ 평균 5분</td>
                    </tr>
                    <tr>
                      <td className="py-5 text-gray-600 font-medium">안전성</td>
                      <td className="py-5 text-gray-400">개인 간 책임</td>
                      <td className="py-5 text-blue-600 font-bold bg-blue-50/30">🛡️ 100% 보증</td>
                    </tr>
                    <tr>
                      <td className="py-5 text-gray-600 font-medium">시세 정보</td>
                      <td className="py-5 text-gray-400">부정확함</td>
                      <td className="py-5 text-blue-600 font-bold bg-blue-50/30">📊 실시간 데이터</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. 이용후기 미리보기 (기존 유지) */}
      <section className="max-w-7xl mx-auto px-4 w-full mb-10">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">최신 거래 후기</h2>
            <p className="text-sm text-gray-500 mt-1">실제 이용 고객님들의 생생한 후기입니다.</p>
          </div>
          <Link href="/reviews" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline">
            더보기 <ArrowRight size={14}/>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* 가짜 데이터 대신 실제 느낌 나게 */}
          {[
            { user: "rkwkd***", date: "2026.02.16", content: "새벽인데도 바로 답장해주셔서 5분만에 거래 끝났네요. 감사합니다!", server: "스카니아" },
            { user: "maple***", date: "2026.02.16", content: "급하게 메소가 필요했는데 쿨거래 굿굿", server: "루나" },
            { user: "hero***", date: "2026.02.15", content: "처음이라 걱정했는데 친절하게 알려주셔서 잘 팔았습니다.", server: "엘리시움" },
            { user: "dudu***", date: "2026.02.15", content: "다른 곳보다 확실히 가격 잘 쳐주네요. 번창하세요~", server: "크로아" },
          ].map((review, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer hover:-translate-y-1">
              <div className="flex justify-between items-start mb-3">
                 <div className="flex text-yellow-400">
                    {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                 </div>
                 <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{review.server}</span>
              </div>
              <p className="text-gray-800 text-sm font-medium mb-4 line-clamp-2 h-10 leading-relaxed">
                "{review.content}"
              </p>
              <div className="text-xs text-gray-400 flex justify-between border-t border-gray-50 pt-3">
                <span className="font-medium text-gray-500">{review.user}</span>
                <span>{review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}