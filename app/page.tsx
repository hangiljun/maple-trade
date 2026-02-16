import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "메이플스토리 아이템/메소 안전거래",
  description:
    "메이플스토리 아이템 및 메소 최고가 매입, 최저가 판매. 전 서버 24시간 안전거래.",
  alternates: {
    canonical: "https://www.xn--kj0b36u99jp4ed8l.com",
  },
};

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* 히어로 섹션 */}
      <section className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
          메이플스토리 아이템
          <br />
          <span className="text-blue-600">안전거래 플랫폼</span>
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          24시간 빠른 거래 · 전 서버 가능 · 안전 보장
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="https://open.kakao.com/o/sKg86b7f"
            target="_blank"
            rel="noreferrer"
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-3 rounded-xl shadow transition"
          >
            카카오톡 문의하기
          </a>

          <Link
            href="/news"
            className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-xl font-bold transition"
          >
            메이플 이슈 보기
          </Link>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="grid md:grid-cols-3 gap-6 mb-20">
        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h3 className="font-bold text-lg mb-2">⚡ 빠른 거래</h3>
          <p className="text-gray-500 text-sm">
            평균 5~10분 내 거래 완료
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h3 className="font-bold text-lg mb-2">🔒 안전 보장</h3>
          <p className="text-gray-500 text-sm">
            사기 걱정 없는 안전 거래 시스템
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <h3 className="font-bold text-lg mb-2">💰 최고가 매입</h3>
          <p className="text-gray-500 text-sm">
            실시간 시세 반영 최고가 보장
          </p>
        </div>
      </section>

      {/* 이용 안내 */}
      <section className="bg-white rounded-2xl shadow p-10 text-center mb-20">
        <h2 className="text-2xl font-bold mb-6">
          거래 방법 안내
        </h2>

        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div>
            <div className="text-xl font-bold mb-2">1️⃣ 문의</div>
            카카오톡으로 아이템/메소 문의
          </div>

          <div>
            <div className="text-xl font-bold mb-2">2️⃣ 시세 확인</div>
            실시간 시세 안내 및 거래 확정
          </div>

          <div>
            <div className="text-xl font-bold mb-2">3️⃣ 안전 거래</div>
            빠르고 안전하게 거래 완료
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-black mb-6">
          지금 바로 안전하게 거래하세요
        </h2>

        <a
          href="https://open.kakao.com/o/sKg86b7f"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-2xl shadow transition"
        >
          24시간 상담하기
        </a>
      </section>
    </div>
  );
}
