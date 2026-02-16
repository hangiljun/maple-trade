import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Menu, MessageCircle } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xn--kj0b36u99jp4ed8l.com"),

  title: {
    default: "메이플급처 - 메이플스토리 아이템/메소 안전거래",
    template: "%s | 메이플급처",
  },

  description:
    "메이플스토리 아이템 및 메소 최고가 매입, 최저가 판매. 전 서버 24시간 안전거래소.",

  openGraph: {
    title: "메이플급처 - 실시간 아이템/메소 거래소",
    description: "24시간 안전 거래 가능",
    url: "https://www.xn--kj0b36u99jp4ed8l.com",
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
}: {
  children: React.ReactNode;
}) {
  const today = new Date();
  const dateString = `${today.getMonth() + 1}월 ${today.getDate()}일`;

  const KAKAO_LINK = "https://open.kakao.com/o/sKg86b7f";

  return (
    <html lang="ko">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center relative">
            <div className="absolute left-4 md:hidden">
              <Menu className="w-6 h-6 text-gray-600" />
            </div>

            <Link
              href="/"
              className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter hover:opacity-80 transition"
            >
              메이플<span className="text-blue-600">급처</span>
            </Link>

            <div className="mt-2 flex items-center gap-2">
              <div className="px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-600 text-sm font-bold flex items-center gap-2">
                {dateString} 정상 운영중
              </div>

              <a
                href={KAKAO_LINK}
                target="_blank"
                rel="noreferrer"
                className="bg-[#FEE500] text-[#3A1D1D] px-3 py-1 rounded-full font-bold text-sm flex items-center gap-1 hover:bg-yellow-400 transition"
              >
                <MessageCircle size={14} />
                카톡문의
              </a>
            </div>
          </div>

          <nav className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
              <ul className="flex justify-center gap-10 py-3 text-sm font-bold text-gray-700">
                <li>
                  <Link href="/">메인 사이트</Link>
                </li>
                <li>
                  <Link href="/tip">이용안내</Link>
                </li>
                <li>
                  <Link href="/reviews">이용후기</Link>
                </li>
                <li>
                  <Link href="/news">메이플 이슈</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <main className="flex-grow bg-slate-50">{children}</main>

        <footer className="bg-gray-900 text-gray-400 py-10 text-center text-sm">
          COPYRIGHT © 메이플급처 ALL RIGHTS RESERVED.
        </footer>
      </body>
    </html>
  );
}
