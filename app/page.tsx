"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ShieldCheck, Zap, TrendingUp, Star, 
  MessageCircle, FileText, ArrowRight, CheckCircle, Bell, Lightbulb,
  HelpCircle, ChevronDown, ChevronUp // ✅ 아이콘 추가됨
} from "lucide-react";
import { db } from '../firebase'; 
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export default function Home() {
  const KAKAO_LINK = "https://open.kakao.com/o/sKg86b7f";
  const [recentReviews, setRecentReviews] = useState<any[]>([]);
  const [recentTips, setRecentTips] = useState<any[]>([]); // ✅ 팁/공지 데이터 상태

  // ✅ [NEW] Q&A 아코디언 상태 관리
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // ✅ [NEW] 자주 묻는 질문 데이터
  const FAQS = [
    {
      q: "거래 절차가 어떻게 되나요?",
      a: "카카오톡으로 아이템 스크린샷을 보내주시면 실시간 경매장 시세 분석 후 견적을 드립니다. 가격 승인 시 인게임에서 즉시 거래하고, 확인 후 바로 종료 입니다."
    },
    {
      q: "정말 안전한가요? 사기는 없나요?",
      a: "저희는 수년간 무사고로 진행 했며, 더치트 사기 이력 조회 시스템을 이용 합니다. 사고 발생 시 100% 전액 보상을 약속드립니다."
    },
    {
      q: "시세 확인후 종료까지 얼마나 걸리나요?",
      a: "시세 확인후 3분 이내로 거래종료 약속 드립니다."
    },
    {
      q: "플래티넘 카르마 가위가 없어서 아이템을 자르지 못하는데 어떻게 하나요?",
      a: "가위가 없으시면 플가를 선 지급 하니 걱정 하지 않으셔도 됩니다."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. 최근 후기 4개 가져오기
        const reviewQ = query(collection(db, "reviews"), orderBy("createdAt", "desc"), limit(4));
        const reviewSnap = await getDocs(reviewQ);
        setRecentReviews(reviewSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

        // 2. ✅ 최근 팁/공지 3개 가져오기 (관리자가 쓴 글)
        const tipQ = query(collection(db, "tips"), orderBy("createdAt", "desc"), limit(3));
        const tipSnap = await getDocs(tipQ);
        setRecentTips(tipSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      } catch (e) {
        console.error("데이터 로딩 실패", e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-12 pb-20">
      
      {/* 1. 홍보 배너 구역 */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            메이플스토리 급처템 <br/> 가장 안전하고 빠르게 정리하세요
          </h1>
          <p className="text-blue-100 mb-8 text-lg">
            실시간 경매장 매물로 시세 측정 합니다.
          </p>
          
          <div className="inline-block border-4 border-pink-500 rounded-xl p-4 bg-black/50 backdrop-blur-sm mb-10">
            <p className="neon-text text-xl md:text-2xl font-mono">
              카카오톡 ID : HAN8246 친구추가 후 연락!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-2xl mx-auto px-4">
             <Link href="/tip" className="flex-1 bg-white text-blue-700 border-2 border-white px-4 py-3.5 rounded-full font-bold hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2 text-sm md:text-base">
               <FileText size={18} /> 거래 방법
             </Link>
             <Link href="/reviews" className="flex-1 bg-white/10 backdrop-blur-md border-2 border-white text-white px-4 py-3.5 rounded-full font-bold hover:bg-white/20 transition shadow-lg flex items-center justify-center gap-2 text-sm md:text-base">
               <Star size={18} className="text-yellow-300 fill-yellow-300"/> 이용 후기
             </Link>
             <a 
               href={KAKAO_LINK}
               target="_blank"
               rel="noreferrer"
               className="flex-1 bg-[#FEE500] text-[#3A1D1D] border-2 border-[#FEE500] px-4 py-3.5 rounded-full font-black hover:bg-yellow-400 transition shadow-xl flex items-center justify-center gap-2 transform hover:scale-105 text-sm md:text-base"
             >
               <MessageCircle size={18} fill="#3A1D1D" /> 카톡 문의
             </a>
          </div>
        </div>
      </section>

      {/* 2. 사이트 신념 */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">우리의 약속</h2>
          <div className="w-10 h-1 bg-blue-500 mx-auto mt-2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition duration-300">
            <ShieldCheck size={40} className="mx-auto mb-4 text-blue-600"/>
            <h3 className="text-xl font-bold mb-2 text-gray-800">무한한 신뢰</h3>
            <p className="text-gray-500 leading-relaxed">모든 거래는 투명하게 공개되며<br/>본인 아이템만 취급합니다.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition duration-300">
            <Zap size={40} className="mx-auto mb-4 text-blue-600"/>
            <h3 className="text-xl font-bold mb-2 text-gray-800">압도적 신속</h3>
            <p className="text-gray-500 leading-relaxed">구매 문의 즉시 응답하며<br/>가장 빠른 거래를 보장합니다.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition duration-300">
            <TrendingUp size={40} className="mx-auto mb-4 text-blue-600"/>
            <h3 className="text-xl font-bold mb-2 text-gray-800">정확한 시세</h3>
            <p className="text-gray-500 leading-relaxed">실시간 경매장 시세 분석으로<br/>최고의 가격을 제안합니다.</p>
          </div>
        </div>
      </section>

      {/* 3. 특징 및 타 사이트 비교 */}
      <section className="bg-white py-16 w-full border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">왜 <span className="text-blue-600">메이플급처템</span>인가요?</h2>
              <ul className="space-y-4">
                {["수수료 0% 직거래 시스템", "실시간 더치트 조회", "24시간 대기 초고속 거래"].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                    <strong className="text-lg text-gray-800">{text}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full">
              <div className="border rounded-xl overflow-hidden shadow-lg">
                <table className="w-full text-center">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="py-4 text-gray-500 font-medium">구분</th>
                      <th className="py-4 text-gray-400 font-medium">타 커뮤니티</th>
                      <th className="py-4 text-blue-600 font-bold bg-blue-50">메이플급처템</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr><td className="py-4 text-gray-600">속도</td><td className="text-gray-400">평균 3시간</td><td className="text-blue-600 font-bold">⚡ 평균 5분</td></tr>
                    <tr><td className="py-4 text-gray-600">안전</td><td className="text-gray-400">개인 책임</td><td className="text-blue-600 font-bold">🛡️ 100% 보증</td></tr>
                    <tr><td className="py-4 text-gray-600">시세</td><td className="text-gray-400">부정확함</td><td className="text-blue-600 font-bold">📊 실시간</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ 4. [NEW] 이용 팁 & 공지사항 섹션 (관리자 작성글 연동) */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-blue-600 font-bold text-sm tracking-wider flex items-center gap-1 mb-1">
              <Bell size={14} /> NOTICE & TIPS
            </span>
            <h2 className="text-2xl font-bold text-gray-900">이용 팁 & 공지사항</h2>
          </div>
          <Link href="/tip" className="text-sm font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1">
            전체보기 <ArrowRight size={14}/>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentTips.length === 0 ? (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-gray-400">
              현재 등록된 공지사항이 없습니다.
            </div>
          ) : (
            recentTips.map((tip) => (
              <div key={tip.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col h-full">
                {/* 썸네일 영역 */}
                <div className="h-40 bg-gray-100 relative overflow-hidden">
                  {tip.thumbnail ? (
                    <img src={tip.thumbnail} alt={tip.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500"/>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                      <Lightbulb size={48} />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                    공지
                  </div>
                </div>
                {/* 텍스트 영역 */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition">
                    {tip.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
                    {tip.content}
                  </p>
                  <div className="pt-4 border-t border-gray-50 text-xs text-gray-400 flex justify-between items-center">
                    <span>관리자</span>
                    <span>{tip.date}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 5. 이용후기 미리보기 */}
      <section className="max-w-7xl mx-auto px-4 w-full mb-10">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">최근 거래 후기</h2>
            <p className="text-sm text-gray-500 mt-1">유저분들이 직접 남겨주신 실시간 후기입니다.</p>
          </div>
          <Link href="/reviews" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline">
            더보기 <ArrowRight size={14}/>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {recentReviews.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-400 border border-dashed rounded-xl">
              아직 등록된 후기가 없습니다.
            </div>
          ) : (
            recentReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer hover:-translate-y-1">
                <div className="flex justify-between items-start mb-3">
                   <div className="flex text-yellow-400">
                      {[1,2,3,4,5].map(star => <Star key={star} size={12} fill="currentColor" />)}
                   </div>
                   <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold border border-blue-100">
                     {review.server || "전서버"}
                   </span>
                </div>
                <p className="text-gray-800 text-sm font-bold mb-2 truncate">{review.title}</p>
                <p className="text-gray-500 text-xs line-clamp-2 h-9 leading-relaxed mb-3">
                  "{review.content}"
                </p>
                <div className="text-[10px] text-gray-400 flex justify-between border-t border-gray-50 pt-3">
                  <span className="font-medium text-gray-500">{review.author}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ✅ 6. [NEW] Q&A (자주 묻는 질문) 섹션 추가 */}
      <section className="bg-gray-50 py-16 w-full mt-4 rounded-t-[40px] border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-blue-600 font-bold text-sm tracking-wider flex items-center justify-center gap-1 mb-2">
              <HelpCircle size={16} /> FAQ
            </span>
            <h2 className="text-3xl font-black text-gray-900">자주 묻는 질문</h2>
            <p className="text-gray-500 mt-2">고객님들이 자주 문의하시는 내용을 정리했습니다.</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition"
                >
                  <span className="font-bold text-gray-800 flex items-center gap-3">
                    <span className="text-blue-600 font-black text-lg">Q.</span>
                    {faq.q}
                  </span>
                  {openFaq === index ? <ChevronUp className="text-gray-400"/> : <ChevronDown className="text-gray-400"/>}
                </button>
                <div 
                  className={`bg-gray-50 px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? "max-h-40 py-5 opacity-100" : "max-h-0 py-0 opacity-0"}`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 mb-4 text-sm">더 궁금한 점이 있으신가요?</p>
            <a 
              href={KAKAO_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#FEE500] text-[#3A1D1D] px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition shadow-md"
            >
              <MessageCircle size={18} fill="#3A1D1D"/> 카톡으로 빠른 문의하기
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}