import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

// --- [SEO 설정] ---
export const metadata: Metadata = {
  // ✅ 사장님의 진짜 도메인 (메이플급처.com)
  metadataBase: new URL('https://www.메이플급처.com'), 

  title: {
    default: "메이플급처 - 메이플스토리 아이템/메소 안전거래",
    template: "%s | 메이플급처",
  },
  description: "메이플스토리 아이템 및 메소 최고가 구입, 최저가 판매. 스카니아, 루나, 엘리시움 등 전 서버 24시간 안전거래. 사기 걱정 없는 빠른 거래. 메이플 급처템",
  
  keywords: [
    "메이플급처", "메이플스토리", "메이플 급처템", "메이플 아이템", "메소 시세", 
    "메이플 장사", "스카니아", "루나", "엘리시움", "크로아", "베라", 
    "아이템 매입", "급처 판매", "메이플 안전거래"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const today = new Date();
  const dateString = `${today.getMonth() + 1}월 ${today.getDate()}일`;

  // ✅ 카톡 링크
  const KAKAO_LINK = "https://open.kakao.com/o/sKg86b7f"; 

  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        
        {/* --- 헤더 시작 --- */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center justify-center relative">
            
            {/* 햄버거 메뉴 (모바일) */}
            <div className="absolute left-4 md:hidden">
              <Menu className="w-6 h-6 text-gray-600" />
            </div>

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

        <footer className="bg-gray-900 text-gray-400 py-10 text-center text-sm">
          <p>COPYRIGHT © 메이플급처 ALL RIGHTS RESERVED.</p>
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