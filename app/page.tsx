import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck, Zap, TrendingUp, Star,
  MessageCircle, FileText, ArrowRight, CheckCircle, Bell, Lightbulb, Megaphone
} from "lucide-react";
import { db } from '../firebase'; 
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import FaqSection from "@/app/components/FaqSection";
import type { Metadata } from "next";
import { KAKAO_LINK } from "@/lib/constants";

export const revalidate = 60;

interface Review {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  server?: string;
}

interface Tip {
  id: string;
  title: string;
  content: string;
  date: string;
  thumbnail?: string;
  fileType?: string;
}

interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  thumbnail?: string;
  fileType?: string;
}

export const metadata: Metadata = {
  title: "메이플 급처템 | 메이플스토리 급처 아이템·메소 안전거래 - 메이플급처",
  description: "메이플급처 - 급처템 전문 안전거래. 스카니아·루나·엘리시움 등 전 서버 최고가 매입, 평균 5분 완료.",
  keywords: [
    "메이플 급처템", "메이플급처템", "메이플급처", "메이플 급처",
    "메이플스토리 급처템", "메이플 아이템 급처",
    "메이플 아이템 판매", "메이플 안전거래", "메이플 아이템 매입",
    "스카니아 급처", "루나 급처", "엘리시움 급처", "크로아 급처",
    "베라 급처", "오로라 급처", "레드 급처", "유니온 급처",
    "제니스 급처", "아케인 급처", "노바 급처", "챌린저스 급처",
    "에오스 급처", "헬리오스 급처",
  ],
  alternates: {
    canonical: "https://www.메이플급처.com",
  },
};

export default async function Home() {
  let recentReviews: Review[] = [];
  let recentTips: Tip[] = [];
  let recentNews: NewsItem[] = [];

  try {
    // 1. 최근 후기 4개
    const reviewQ = query(collection(db, "reviews"), orderBy("createdAt", "desc"), limit(4));
    const reviewSnap = await getDocs(reviewQ);
    recentReviews = reviewSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));

    const tipQ = query(collection(db, "tips"), orderBy("createdAt", "desc"), limit(3));
    const tipSnap = await getDocs(tipQ);
    recentTips = tipSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tip));

    const newsQ = query(collection(db, "news"), orderBy("createdAt", "desc"), limit(5));
    const newsSnap = await getDocs(newsQ);
    recentNews = newsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as NewsItem));

  } catch (e) {
    console.error("데이터 로딩 실패", e);
  }

  // 카테고리별 색상 (News용)
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "공지": return "text-red-500";
      case "이벤트": return "text-blue-600";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="flex flex-col gap-12 pb-20">

      {/* 1. 홍보 배너 구역 */}
      <section className="relative py-12 text-center text-white overflow-hidden" aria-label="메인 홍보 섹션">
        {/* 배경 이미지 */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hero-banner.png)',
            filter: 'brightness(0.7)'
          }}
        />

        {/* 어두운 오버레이 (텍스트 가독성) */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
            메이플스토리 급처템 <br/> 가장 안전하고 빠르게 정리하세요
          </h1>
          <p className="text-blue-100 mb-6 text-base">
            실시간 경매장 매물로 시세 측정 합니다.
          </p>

          <div className="inline-block border-4 border-pink-500 rounded-xl p-3 bg-black/50 backdrop-blur-sm mb-6">
            <p className="neon-text text-lg md:text-xl font-mono">
              365일 24시간 메이플 거래 대기중
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-2xl mx-auto px-4 mb-6">
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

          {/* 카카오톡 ID */}
          <p className="text-sm text-blue-100">
            카카오톡 ID 검색:{" "}
            <span className="font-bold text-white bg-white/15 border border-white/20 px-2.5 py-1 rounded-lg">
              han8246
            </span>
            으로도 문의하실 수 있습니다
          </p>
        </div>
      </section>

      {/* 2. 사이트 신념 */}
      <section className="max-w-7xl mx-auto px-4 w-full" aria-labelledby="promise-heading">
        <div className="text-center mb-10">
          <h2 id="promise-heading" className="text-2xl font-bold text-gray-800">우리의 약속</h2>
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

      {/* SEO 콘텐츠 섹션 */}
      <section className="max-w-4xl mx-auto px-4 w-full py-16" aria-labelledby="seo-content">
        <article className="prose prose-lg max-w-none">
          <h2 id="seo-content" className="text-3xl font-bold text-gray-900 mb-6">메이플급처 - 정확한 시세 측정으로 손해 없는 거래</h2>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">메이플 급처템, 왜 시세 확인이 중요할까요?</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            메이플스토리 유저 대부분은 보스 레이드, 사냥, 캐릭터 육성에 집중하며 경매장 시세를 매일 확인하기 어렵습니다. 아이템을 한 번 구매한 후에는 현재 가격을 잘 모르는 경우가 많습니다.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6 rounded-r-lg">
            <p className="font-bold text-gray-800 mb-3">하지만 메이플 아이템 시세는 생각보다 빠르게 변합니다:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-red-500 font-bold">📉</span> 대형 패치 후 500억 템이 300억으로 하락
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500 font-bold">📈</span> 여름방학 시즌에 300억 템이 800억으로 상승
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-500 font-bold">🔄</span> 신규 직업 출시로 특정 템 가격 급등
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">정보 비대칭의 함정 - 메이플급처가 해결합니다</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            전문 거래상들은 경매장을 24시간 모니터링하며 시세 변동에 즉각 대응합니다. 고성능 확성기로 <strong className="text-red-600">"급처템 80~90% 가격에 삽니다"</strong>라고 외치지만, 정확한 현재 시세는 알려주지 않습니다.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200 my-6">
            <p className="font-bold text-blue-900 mb-3">메이플급처는 다릅니다:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600 flex-shrink-0" /> 현재 경매장 매물 실시간 비교
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600 flex-shrink-0" /> 최근 거래 내역 공개
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600 flex-shrink-0" /> 옵션별 차액 상세 설명
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-600 flex-shrink-0" /> 시세 변동 요인 투명 공개
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">메이플급처만의 3가지 차별점</h3>

          <div className="grid md:grid-cols-3 gap-6 my-6">
            <div className="bg-white p-6 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">투명한 시세 측정</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                단순히 가격만 제시하지 않습니다. 현재 매물, 거래 사례, 옵션 비교를 함께 설명해 판매자가 100% 납득하고 거래할 수 있도록 합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">실시간 경매장 분석</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                메이플 전 서버 경매장 시세를 실시간으로 확인하여 가장 정확한 가격을 제시합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-bold text-lg text-gray-800 mb-2">평균 5분 내 빠른 거래</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                시세 확인부터 거래 완료까지 평균 5분. 복잡한 절차 없이 빠르고 안전하게 진행됩니다.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl text-center my-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-3">지금 바로 메이플급처에서 정확한 시세를 확인하세요</h3>
            <p className="text-blue-100 mb-6">
              메이플 급처템 판매 전, 정확한 시세 측정은 필수입니다.<br />
              손해 없는 거래의 시작, <strong>메이플급처</strong>와 함께하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <a
                href={KAKAO_LINK}
                target="_blank"
                rel="noreferrer"
                className="bg-[#FEE500] text-[#3A1D1D] px-8 py-4 rounded-full font-black hover:bg-yellow-400 transition shadow-xl flex items-center gap-2 transform hover:scale-105"
              >
                <MessageCircle size={20} fill="#3A1D1D" /> 카카오톡으로 상담하기
              </a>
              <span className="text-sm text-blue-100">
                📞 카카오톡 ID: <strong className="text-white">han8246</strong> | 연중무휴 24시간 상담
              </span>
            </div>
          </div>
        </article>
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

      {/* ✅ [추가됨] 4. NEWS 섹션 (팁 위, 후기 위) */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-red-500 font-bold text-sm tracking-wider flex items-center gap-1 mb-1">
              <Megaphone size={14} /> LATEST NEWS
            </span>
            <h2 className="text-2xl font-bold text-gray-900">메이플 이슈 & 소식</h2>
          </div>
          <Link href="/news" className="text-sm font-bold text-gray-500 hover:text-blue-600 flex items-center gap-1">
            전체보기 <ArrowRight size={14}/>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {recentNews.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              등록된 뉴스가 없습니다.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recentNews.map((item) => (
                <li key={item.id} className="hover:bg-gray-50 transition">
                  <Link href={`/news/${item.id}`} className="flex items-center justify-between gap-4 p-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className={`text-xs font-bold whitespace-nowrap px-2 py-1 rounded bg-gray-100 flex-shrink-0 ${getCategoryColor(item.category)}`}>
                        {item.category || "공지"}
                      </span>
                      <span className="text-gray-800 font-medium truncate">
                        {item.title}
                      </span>
                      {item.date === new Date().toLocaleDateString('ko-KR') && (
                        <span className="w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-sm font-bold flex-shrink-0">N</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs text-gray-400 whitespace-nowrap hidden sm:block">{item.date}</span>
                      {item.thumbnail && (
                        <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
                          {item.fileType === "video" ? (
                            <video src={item.thumbnail} className="w-full h-full object-cover" muted />
                          ) : (
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
      </section>

      {/* 5. 이용 팁 & 공지사항 섹션 */}
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
              <Link 
                href={`/tip/${tip.id}`} 
                key={tip.id} 
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition cursor-pointer flex flex-col h-full"
              >
                <div className="h-40 bg-gray-100 overflow-hidden">
                  {tip.thumbnail ? (
                    <img src={tip.thumbnail} alt={tip.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-200">
                      <Lightbulb size={48} />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
                    공지
                  </div>
                </div>
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
              </Link>
            ))
          )}
        </div>
      </section>

      {/* 6. 이용후기 미리보기 */}
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
              <Link 
                href={`/reviews/${review.id}`}
                key={review.id} 
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer hover:-translate-y-1 block"
              >
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
              </Link>
            ))
          )}
        </div>
      </section>

      {/* 7. 자주 묻는 질문(FAQ) */}
      <FaqSection />

    </div>
  );
}