import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  TrendingUp,
  Star,
  MessageCircle,
  FileText,
  ArrowRight,
  CheckCircle,
  Bell,
  Lightbulb,
} from "lucide-react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import FaqSection from "@/app/components/FaqSection";
import type { Metadata } from "next";

export const revalidate = 600; // 🔥 10분 ISR 캐싱

const SITE_URL = "https://www.xn--kj0b36u99jp4ed8l.com";

export const metadata: Metadata = {
  title:
    "메이플급처 | 메이플스토리 메소 · 아이템 안전거래소 (스카니아/루나/엘리시움)",
  description:
    "메이플스토리 메소 및 아이템 최고가 매입 · 최저가 판매. 스카니아, 루나, 엘리시움, 크로아 전 서버 24시간 실시간 시세 확인 및 즉시 거래.",
  keywords: [
    "메이플급처",
    "메이플메소",
    "메이플스토리 메소 거래",
    "메이플 아이템 판매",
    "스카니아 메소",
    "루나 메소",
    "엘리시움 메소",
    "메이플 급처템",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title:
      "메이플급처 | 메이플스토리 메소 · 아이템 안전거래소",
    description:
      "전 서버 메이플 메소 및 아이템 실시간 시세 기반 안전 거래.",
    url: SITE_URL,
    siteName: "메이플급처",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "메이플급처 - 메이플스토리 안전거래소",
    description:
      "24시간 메이플 메소 · 아이템 거래 대기중",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function Home() {
  const KAKAO_LINK = "https://open.kakao.com/o/sKg86b7f";

  let recentReviews: any[] = [];
  let recentTips: any[] = [];

  try {
    const reviewQ = query(
      collection(db, "reviews"),
      orderBy("createdAt", "desc"),
      limit(4)
    );
    const reviewSnap = await getDocs(reviewQ);
    recentReviews = reviewSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const tipQ = query(
      collection(db, "tips"),
      orderBy("createdAt", "desc"),
      limit(3)
    );
    const tipSnap = await getDocs(tipQ);
    recentTips = tipSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (e) {
    console.error("데이터 로딩 실패", e);
  }

  /* ---------------- 구조화 데이터 ---------------- */

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "메이플급처",
        url: SITE_URL,
        sameAs: [KAKAO_LINK],
      },
      {
        "@type": "WebSite",
        name: "메이플급처",
        url: SITE_URL,
      },
    ],
  };

  return (
    <>
      {/* 🔥 구조화 데이터 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="flex flex-col gap-12 pb-20">
        {/* 1. 홍보 배너 구역 */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-center text-white relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              메이플스토리 메소 · 아이템 급처 거래소 <br />
              가장 안전하고 빠르게 정리하세요
            </h1>

            {/* 🔥 SEO용 보강 텍스트 (UI 영향 없음) */}
            <p className="hidden">
              메이플스토리 메소 거래, 메이플 아이템 판매,
              스카니아 메소, 루나 메소, 엘리시움 메소
              전 서버 안전거래 플랫폼입니다.
            </p>

            <p className="text-blue-100 mb-8 text-lg">
              실시간 경매장 매물로 시세 측정 합니다.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 w-full max-w-2xl mx-auto px-4">
              <Link
                href="/tip"
                className="flex-1 bg-white text-blue-700 border-2 border-white px-4 py-3.5 rounded-full font-bold"
              >
                <FileText size={18} /> 거래 방법
              </Link>

              <Link
                href="/reviews"
                className="flex-1 bg-white/10 border-2 border-white text-white px-4 py-3.5 rounded-full font-bold"
              >
                <Star size={18} /> 이용 후기
              </Link>

              <a
                href={KAKAO_LINK}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-[#FEE500] text-[#3A1D1D] px-4 py-3.5 rounded-full font-black"
              >
                <MessageCircle size={18} /> 카톡 문의
              </a>
            </div>
          </div>
        </section>

        {/* 이하 UI 완전 동일 유지 */}
        <FaqSection />
      </div>
    </>
  );
}
