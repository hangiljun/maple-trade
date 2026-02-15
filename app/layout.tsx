import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Menu } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

// --- 검색 최적화(SEO) 설정 (유지) ---
export const metadata: Metadata = {
  title: "메이플급처템 - 신속하고 안전한 아이템 거래소",
  description: "메이플 급처템, 메이플 아이템, 메소 매입/매매 전문. 장사꾼보다 좋은 조건으로 빠르고 안전하게 거래하세요.",
  keywords: "메이플 급처템, 메이플 아이템, 메소, 메이플 장사꾼, 아이템 매입, 급처템 판매",
  openGraph: {
    title: "메이플급처템 - 실시간 아이템 거래소",
    description: "메이플 급처템, 메소 거래는 여기서! 24시간 안전하게 상담 가능합니다.",
    url: "https://메이플급처템.com",
    siteName: "메이플급처템",
    locale: "ko_KR",
    type: "website",
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
  // 오늘 날짜 구하기 (서버 시간 기준)
  const today = new Date();
  const dateString = `${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        
        {/* --- 헤더 시작 --- */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center justify-center relative">
            
            {/* 1. 모바일용 햄버거 메뉴 (왼쪽에 작게 유지) */}
            <div className="absolute left-4 md:hidden">
              <Menu className="w-6 h-6 text-gray-600" />
            </div>

            {/* 2. [수정됨] 사이트 이름 (가운데 정렬 + .com 제거) */}
            <Link href="/" className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter hover:opacity-80 transition">
              메이플<span className="text-blue-600">급처템</span>
            </Link>

            {/* 3. [추가됨] 실시간 날짜 네온사인 (반짝이는 효과) */}
            <div className="mt-2 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-600 text-sm font-bold animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.4)] flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {dateString} 정상 운영중
            </div>

            {/* (오른쪽 검색/로그인 기능은 요청대로 완전히 삭제했습니다) */}

          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
              <ul className="flex justify-center gap-6 md:gap-16 py-3 text-sm md:text-base font-bold text-gray-700">
                <li className="hover:text-blue-600 transition"><Link href="/">메인 사이트</Link></li>
                <li className="hover:text-blue-600 transition"><Link href="/tip">이용안내</Link></li>
                <li className="hover:text-blue-600 transition"><Link href="/reviews">이용후기</Link></li>
                <li className="hover:text-blue-600 transition"><Link href="/news">메이플 이슈</Link></li>
                {/* [수정됨] 관리자 페이지 메뉴 삭제 (비공개 처리) */}
              </ul>
            </div>
          </nav>
        </header>
        {/* --- 헤더 끝 --- */}

        {/* 페이지 콘텐츠 영역 */}
        <main className="flex-grow bg-slate-50">
          {children}
        </main>

        {/* --- 푸터 시작 --- */}
        <footer className="bg-gray-900 text-gray-400 py-10 text-center text-sm">
          <p>COPYRIGHT © 메이플급처템 ALL RIGHTS RESERVED.</p>
        </footer>
        {/* --- 푸터 끝 --- */}

      </body>
    </html>
  );
}