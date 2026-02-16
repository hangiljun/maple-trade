"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CheckCircle, Zap, ShieldCheck, TrendingUp, Star, 
  MessageCircle, FileText, ArrowRight 
} from "lucide-react";
import { db } from '../firebase'; // 사장님 환경에 맞게 경로 확인 필수!
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export default function Home() {
  // ✅ 사장님의 실제 카톡 링크
  const KAKAO_LINK = "https://open.kakao.com/o/sKg86b7f";
  const [recentReviews, setRecentReviews] = useState<any[]>([]);

  // 🚀 DB에서 최신 후기 4개 실시간으로 가져오기
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"), limit(4));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecentReviews(data);
      } catch (e) {
        console.error("메인 후기 로딩 실패:", e);
      }
    };
    fetchRecent();
  }, []);

  return (
    <div className="flex flex-col gap-12 pb-20">
      
      {/* 1. 홍보 배너 구역 - 기존 그라데이션과 텍스트 완벽 복구 */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            메이플스토리 급처템 <br/> 가장 안전하고 빠르게 구매하세요
          </h1>
          <p className="text-blue-100 mb-8 text-lg">
            시세보다 저렴한 아이템을 실시간으로 확인하고 거래할 수 있습니다.
          </p>
          
          {/* 네온사인 효과 */}
          <div className="inline-block border-4 border-pink-500 rounded-xl p-4 bg-black/50 backdrop-blur-sm mb-8">
            <p className="neon-text text-xl md:text-2xl font-mono">
              OPEN 365일 24시간 정상 운영중
            </p>
          </div>

          {/* 버튼 그룹 - 카톡 문의 추가됨 */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4 w-full max-w-lg mx-auto">
             <Link href="/tip" className="flex-1 bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2">
               <FileText size={20} /> 거래 방법 보기
             </Link>
             <Link href="/reviews" className="flex-1 bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition flex items-center justify-center gap-2">
               <Star size={20} className="text-yellow-300 fill-yellow-300"/> 리얼 후기 확인
             </Link>
             <a 
               href={KAKAO_LINK}
               target="_blank"
               rel="noreferrer"
               className="flex-1 bg-[#FEE500] text-[#3A1D1D] px-8 py-3 rounded-full font-black hover:bg-yellow-400 transition shadow-xl flex items-center justify-center gap-2 transform hover:scale-105"
             >
               <MessageCircle size={20} fill="#3A1D1D" /> 카톡 문의
             </a>
          </div>
        </div>
      </section>

      {/* 2. 사이트 신념 - 기존 아이콘과 텍스트 완벽 복구 */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">우리의 약속</h2>
          <div className="w-10 h-1 bg-blue-500 mx-auto mt-2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition duration-300 group">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">무한한 신뢰</h3>
            <p className="text-gray-500 leading-relaxed">모든 거래는 투명하게 공개되며<br/>검증된 아이템만 취급합니다.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition duration-300 group">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">압도적 신속</h3>
            <p className="text-gray-500 leading-relaxed">구매 문의 즉시 응답하며<br/>가장 빠른 거래를 보장합니다.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition duration-300 group">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">정확한 시세</h3>
            <p className="text-gray-500 leading-relaxed">데이터 기반의 시세 분석으로<br/>최적의 가격을 제안합니다.</p>
          </div>
        </div>
      </section>

      {/* 3. 특징 및 타 사이트 비교 - 기존 테이블 내용 완벽 복구 */}
      <section className="bg-white py-16 w-full border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">왜 <span className="text-blue-600">메이플급처템</span>인가요?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="block text-lg">수수료 0% 직거래 시스템</strong>
                    <span className="text-gray-500">타 중개 사이트의 과도한 수수료를 없앴습니다.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="block text-lg">사기 조회 자동 연동</strong>
                    <span className="text-gray-500">더치트 및 메이플 공식 홈페이지 블랙리스트 자동 대조.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <strong className="block text-lg">24시간 전담 매니저 배치</strong>
                    <span className="text-gray-500">새벽 시간대에도 즉시 거래가 가능합니다.</span>
                  </div>
                </li>
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
                    <tr>
                      <td className="py-4 text-gray-600">거래 속도</td>
                      <td className="py-4 text-gray-400">평균 3시간</td>
                      <td className="py-4 text-blue-600 font-bold bg-blue-50">평균 5분</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-600">안전성</td>
                      <td className="py-4 text-gray-400">개인 간 책임</td>
                      <td className="py-4 text-blue-600 font-bold bg-blue-50">100% 보증</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-600">시세 정보</td>
                      <td className="py-4 text-gray-400">부정확함</td>
                      <td className="py-4 text-blue-600 font-bold bg-blue-50">실시간 데이터</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 이용후기 미리보기 - 실제 DB 연동 구역 */}
      <section className="max-w-7xl mx-auto px-4 w-full mb-10">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">최근 거래 후기</h2>
            <p className="text-sm text-gray-500 mt-1">실제 이용 고객님들이 직접 남겨주신 실시간 후기입니다.</p>
          </div>
          <Link href="/reviews" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline">
            더보기 <ArrowRight size={14}/>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {recentReviews.length === 0 ? (
            <div className="col-span-full text-center py-10 text-gray-400 border border-dashed rounded-xl">
              아직 등록된 후기가 없습니다. 첫 후기의 주인공이 되어보세요!
            </div>
          ) : (
            recentReviews.map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer hover:-translate-y-1">
                <div className="flex justify-between items-start mb-3">
                   <div className="flex text-yellow-400">
                      {[1,2,3,4,5].map(star => <Star key={star} size={14} fill="currentColor" />)}
                   </div>
                   <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold border border-blue-100">
                     {review.server || "전서버"}
                   </span>
                </div>
                <p className="text-gray-800 text-sm font-bold mb-2 truncate">{review.title}</p>
                <p className="text-gray-500 text-xs line-clamp-2 h-10 leading-relaxed mb-4">
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
    </div>
  );
}