import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { KAKAO_LINK } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

// --- [SEO 설정] ---
export const metadata: Metadata = {
  // ✅ 사장님의 진짜 도메인 (메이플급처.com)
  metadataBase: new URL('https://www.메이플급처.com'), 

  title: {
    default: "메이플 급처템 | 메이플급처 - 메이플스토리 아이템·메소 안전거래",
    template: "%s | 메이플급처",
  },
  description: "메이플 급처템·메소 전문 거래소 메이플급처. 스카니아·루나·엘리시움·크로아 전 서버 급처 아이템 최고가 매입, 최저가 판매. 24시간 평균 5분 이내 거래 완료.",

  keywords: [
    "메이플 급처템", "메이플급처템", "메이플급처", "메이플 급처",
    "메이플스토리 급처템", "메이플 아이템 급처", "메이플 메소 급처",
    "메이플스토리", "메이플 아이템", "메소 거래", "메소 시세",
    "스카니아 급처", "루나 급처", "엘리시움 급처", "크로아 급처",
    "베라 급처", "오로라 급처", "리부트 급처", "리부트 메소",
    "스카니아 메소", "루나 메소", "엘리시움 메소", "크로아 메소",
    "아이템 매입", "메이플 안전거래"
  ],
  
  openGraph: {
    title: "메이플급처 - 실시간 아이템/메소 거래소",
    description: "메이플 급처, 메소 거래는 여기서! 24시간 안전하게 상담 가능합니다.",
    url: "https://www.메이플급처.com", 
    siteName: "메이플급처",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "메이플급처 대표 이미지",
      },
    ],
  },

  // ✅ [수정 완료] 구글 & 네이버 인증 코드 완벽 적용!
  verification: {
    google: "Rni7NhHr2qjpxvzQReEFBVyKhDnfaiwIpN044_AeS2Y", 
    other: {
      "naver-site-verification": "1ae03adb446f41df72a8747220abda5c871be51a",
    },
  },

  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "메이플급처",
  "alternateName": ["메이플급처템", "메이플 급처", "메이플스토리 급처"],
  "description": "메이플스토리 아이템 및 메소 최고가 구입, 최저가 판매. 스카니아, 루나, 엘리시움 등 전 서버 24시간 안전거래.",
  "url": "https://www.메이플급처.com",
  "openingHours": "Mo-Su 00:00-24:00",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": "Korean",
    "url": "https://open.kakao.com/o/sKg86b7f"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const today = new Date();
  const dateString = `${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        
        {/* --- 헤더 시작 --- */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center justify-center relative">
            
            {/* 1. 로고 (가운데 정렬) */}
            <Link href="/" className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter hover:opacity-80 transition">
              메이플<span className="text-blue-600">급처</span>
            </Link>
            
            {/* 2. 날짜 배지 + 카톡 버튼 */}
            <div className="mt-2 flex items-center gap-2">
              <div className="px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-600 text-sm font-bold shadow-[0_0_10px_rgba(34,197,94,0.4)] flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                {dateString} 정상 운영중
              </div>

              <a 
                href={KAKAO_LINK}
                target="_blank"
                rel="noreferrer"
                className="bg-[#FEE500] text-[#3A1D1D] px-2 py-1 md:px-3 md:py-1 rounded-full font-bold text-xs md:text-sm flex items-center gap-1 hover:bg-yellow-400 transition shadow-sm animate-pulse"
              >
                <MessageCircle size={14} fill="#3A1D1D" className="md:w-4 md:h-4"/>
                <span className="md:inline">카톡문의</span>
              </a>
            </div>
          </div>

          {/* 네비게이션 */}
          <nav className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
              <ul className="flex justify-center gap-5 md:gap-16 py-3 text-sm md:text-base font-bold text-gray-700">
                <li className="hover:text-blue-600 transition"><Link href="/">메인 사이트</Link></li>
                <li className="hover:text-blue-600 transition"><Link href="/tip">이용안내</Link></li>
                <li className="hover:text-blue-600 transition"><Link href="/reviews">이용후기</Link></li>
                <li className="hover:text-blue-600 transition"><Link href="/news">메이플 이슈</Link></li>
              </ul>
            </div>
          </nav>
        </header>

        {/* 메인 콘텐츠 */}
        <main className="flex-grow bg-slate-50">
          {children}
        </main>

        <footer className="bg-gray-900 text-gray-400 text-sm">
          <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between gap-8">
            {/* 브랜드 */}
            <div>
              <p className="text-white text-xl font-black tracking-tighter mb-2">
                메이플<span className="text-blue-400">급처</span>
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                메이플스토리 아이템·메소 안전거래<br />
                365일 24시간 운영
              </p>
              <a
                href={KAKAO_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 bg-[#FEE500] text-[#3A1D1D] px-3 py-1.5 rounded-full font-bold text-xs hover:bg-yellow-400 transition"
              >
                <MessageCircle size={12} fill="#3A1D1D" /> 카톡 문의
              </a>
            </div>

            {/* 메뉴 */}
            <div className="flex gap-12">
              <div>
                <p className="text-white font-bold mb-3 text-xs uppercase tracking-wider">서비스</p>
                <ul className="space-y-2 text-gray-500">
                  <li><Link href="/" className="hover:text-white transition">메인</Link></li>
                  <li><Link href="/tip" className="hover:text-white transition">이용안내</Link></li>
                  <li><Link href="/reviews" className="hover:text-white transition">이용후기</Link></li>
                  <li><Link href="/news" className="hover:text-white transition">메이플 이슈</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
            COPYRIGHT © 메이플급처 ALL RIGHTS RESERVED.
          </div>
        </footer>

        {/* 우측 하단 둥둥 떠다니는 카톡 버튼 */}
        <a 
          href={KAKAO_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-[#FEE500] hover:bg-yellow-400 text-[#3A1D1D] font-bold py-3 px-5 rounded-full shadow-2xl flex items-center gap-2 transition transform hover:scale-105 z-50 animate-bounce-slow border-2 border-yellow-200"
          style={{ boxShadow: "0 4px 14px rgba(0,0,0,0.25)" }}
        >
          <MessageCircle size={24} fill="#3A1D1D" />
          <span className="text-lg">거래 문의</span>
        </a>

      </body>
    </html>
  );
}