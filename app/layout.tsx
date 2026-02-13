import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "메이플급처템.com",
  description: "가장 빠른 메이플스토리 급처템 매입",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-white text-gray-900 antialiased">
        <nav className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            {/* 로고 클릭 시 홈으로 이동 */}
            <a href="/" className="text-2xl font-black text-orange-500 tracking-tighter">메이플급처템.com</a>
            
            {/* 메뉴 구성 */}
            <div className="hidden md:flex space-x-8 font-semibold text-gray-600">
              <a href="/tip" className="hover:text-orange-500 transition">이용안내</a>
              <a href="/reviews" className="hover:text-orange-500 transition">이용후기</a>
              <a href="/news" className="hover:text-orange-500 transition">메이플 이슈</a>
            </div>
          </div>
        </nav>
        
        {/* 실제 페이지 내용이 들어가는 구역 */}
        <main className="max-w-6xl mx-auto px-4 py-10">
          {children}
        </main>

        <footer className="border-t border-gray-100 py-10 text-center text-gray-400 text-sm">
          <p>© 2026 메이플급처템.com All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}