import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, MessageCircle, CreditCard, Gift, FileText } from "lucide-react";
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import ImageViewer from "./ImageViewer";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "이용안내 - 메이플급처 거래 방법 및 안전거래 가이드",
  description: "메이플급처 이용방법, 거래 절차, 안전거래 팁을 확인하세요. 메이플 급처템, 아이템, 메소 거래 전 필독!",
  keywords: ["메이플급처 이용안내", "메이플 거래 방법", "메이플 안전거래", "메이플 아이템 거래 팁", "메이플 급처 가이드"],
  openGraph: {
    title: "이용안내 - 메이플급처",
    description: "안전하고 빠른 메이플 거래 가이드",
    url: "https://www.메이플급처.com/tip",
  },
  alternates: {
    canonical: "https://www.메이플급처.com/tip",
  },
};

export default async function TipPage() {
  let tipsList: any[] = [];

  try {
    const q = query(collection(db, "tips"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    tipsList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("팁 로딩 실패:", error);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 min-h-screen">

      {/* 1. 상단 고정 가이드 */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
          이용안내 및 안전거래 꿀팁
        </h1>
        <p className="text-gray-500 text-lg">메이플급처템에서 안전하고 빠르게 거래하는 방법입니다.</p>
      </div>

      {/* 판매자 가이드 섹션 */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold text-blue-600 mb-8 flex items-center gap-2">
          <span className="bg-blue-100 p-2 rounded-lg"><Gift className="w-6 h-6"/></span>
          아이템 판매 방법
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative hover:shadow-md transition">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white">1</div>
            <h3 className="font-bold text-lg mb-3 mt-2 text-gray-800">판매 신청</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              카카오톡 채널을 통해 판매할 아이템의 사진과 통판매시 닉네임을 전송합니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative hover:shadow-md transition">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white">2</div>
            <h3 className="font-bold text-lg mb-3 mt-2 text-gray-800">시세 확인 및 조율</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              실시간 경매장 시세를 확인하여 최고의 구매가격을 제안해 드립니다.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative hover:shadow-md transition">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white">3</div>
            <h3 className="font-bold text-lg mb-3 mt-2 text-gray-800">거래 및 종료</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              게임 내에서 만나서 아이템을 확인 하고 거래 합니다. *궁금하신 내용은 문의주세요
            </p>
          </div>
        </div>
      </section>

      {/* 구매자 가이드 섹션 */}
      <section className="mb-24">
        <h2 className="text-2xl font-bold text-green-600 mb-8 flex items-center gap-2">
          <span className="bg-green-100 p-2 rounded-lg"><CreditCard className="w-6 h-6"/></span>
          메소 구매 방법
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-green-200 transition">
            <MessageCircle className="text-green-500 mt-1 min-w-[24px]" />
            <div>
              <strong className="block text-gray-800 mb-1 text-lg">구매 문의</strong>
              <p className="text-gray-600 text-sm">원하시는 수량/서버/닉네임을 카카오톡으로 문의를 남겨주세요.</p>
            </div>
          </div>
          <div className="flex justify-center py-2">
            <ArrowRight className="text-gray-300 rotate-90 md:rotate-0" />
          </div>
          <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-green-200 transition">
            <CreditCard className="text-green-500 mt-1 min-w-[24px]" />
            <div>
              <strong className="block text-gray-800 mb-1 text-lg">거래 진행</strong>
              <p className="text-gray-600 text-sm">카카오톡 or 문자로 게임내 지정된 장소를 정합니다.</p>
            </div>
          </div>
          <div className="flex justify-center py-2">
            <ArrowRight className="text-gray-300 rotate-90 md:rotate-0" />
          </div>
          <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:border-green-200 transition">
            <ShieldCheck className="text-green-500 mt-1 min-w-[24px]" />
            <div>
              <strong className="block text-gray-800 mb-1 text-lg">메소 수령</strong>
              <p className="text-gray-600 text-sm">인게임 내 지정된 장소에서 안전하게 메소를 수령합니다.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t-2 border-gray-100 my-16"></div>

      {/* 2. 하단 게시판 영역 - 메이플 이슈 스타일 */}
      <section>
        <div className="mb-6 border-b-2 border-gray-900 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="text-purple-600"/> 추가 이용 팁 & 공지
          </h2>
          <p className="text-sm text-gray-500 mt-1">관리자가 직접 작성한 상세 가이드입니다.</p>
        </div>

        <div className="bg-white border-t border-gray-200">
          {tipsList.length === 0 ? (
            <div className="text-center py-20 text-gray-400">등록된 게시글이 없습니다.</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {tipsList.map((item) => {
                const getCategoryColor = (cat: string) => {
                  switch (cat) {
                    case "공지": return "text-red-500 font-bold";
                    case "이용팁": return "text-purple-600 font-bold";
                    case "안전거래": return "text-blue-600 font-bold";
                    case "가이드": return "text-green-600 font-bold";
                    default: return "text-gray-500";
                  }
                };
                const today = new Date().toLocaleDateString('ko-KR');

                return (
                  <li key={item.id} className="hover:bg-gray-50 transition duration-150">
                    <Link href={`/tip/${item.id}`} className="block px-2 py-4 sm:px-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className={`flex-shrink-0 text-sm ${getCategoryColor(item.category)}`}>[{item.category || "공지"}]</span>
                            <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate pr-4">{item.title}</h3>
                            {item.date === today && <span className="w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-sm font-bold">N</span>}
                          </div>
                          <div className="flex items-center text-xs sm:text-sm text-gray-400 gap-3">
                            <div className="flex items-center gap-1.5">
                              <img src="/favicon.ico" alt="admin" width={16} height={16} className="rounded-full border border-gray-200" />
                              <span className="font-medium text-gray-600">관리자</span>
                            </div>
                            <span className="w-px h-3 bg-gray-300"></span>
                            <span>{item.date}</span>
                          </div>
                        </div>
                        {item.thumbnail && (
                          <div className="flex-shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                            {item.fileType === 'video' ? (
                              <video src={item.thumbnail} className="w-full h-full object-cover" muted />
                            ) : (
                              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                            )}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <div className="mt-20 text-center">
        <Link href="/" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          🏠 메인으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
