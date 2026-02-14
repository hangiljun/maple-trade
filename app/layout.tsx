import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Geist 대신 Inter 폰트 가져오기
import "./globals.css";
import Link from "next/link";
import { Search, Menu, User } from "lucide-react";

// 폰트 설정 (에러 원인 해결)
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "메이플급처템.com",
  description: "신뢰와 신속의 메이플스토리 아이템 거래소",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      {/* 폰트 적용 및 전체 레이아웃 설정 */}
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        
        {/* --- 헤더 시작 (사장님 디자인 유지) --- */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            
            {/* 햄버거 메뉴 (모바일) */}
            <div className="md:hidden">
              <Menu className="w-6 h-6" />
            </div>

            {/* 로고 */}
            <Link href="/" className="text-2xl font-black text-gray-900 tracking-tighter">
              메이플<span className="text-blue-600">급처템</span>.com
            </Link>

            {/* 우측 검색 및 아이콘 */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex relative">
                <input 
                  type="text" 
                  placeholder="아이템 검색..." 
                  className="pl-4 pr-10 py-2 border rounded-full text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="w-4 h-4 absolute right-3 top-3 text-gray-400" />
              </div>
              <Search className="w-6 h-6 md:hidden" />
              <User className="w-6 h-6 cursor-pointer hover:text-blue-600" />
            </div>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
              <ul className="flex justify-center gap-8 md:gap-16 py-3 text-sm md:text-base font-bold text-gray-700">
                <li className="hover:text-blue-600 transition"><Link href="/">메인 사이트</Link></li>
                <li className="hover:text-blue-600 transition"><Link href="/tip">이용안내</Link></li>
                <li className="hover:text-blue-600 transition"><Link href="/reviews">이용후기</Link></li>
                <li className="hover:text-blue-600 transition"><Link href="/news">메이플 이슈</Link></li>
                <li className="hover:text-red-500 transition"><Link href="/admin">관리자 페이지</Link></li>
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
          <p>COPYRIGHT © 메이플급처템.com ALL RIGHTS RESERVED.</p>
        </footer>
        {/* --- 푸터 끝 --- */}

      </body>
    </html>
  );
}