"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, MessageCircle, CreditCard, Gift, FileText } from "lucide-react";
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore'; // ✅ getDocs 사용

export default function TipPage() {
  const [tipsList, setTipsList] = useState<any[]>([]);

  useEffect(() => {
    // ✅ 비용 절감을 위해 실시간 감시 대신 단발성 호출 사용
    const fetchTips = async () => {
      try {
        const q = query(collection(db, "tips"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        setTipsList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("팁 로딩 실패:", error);
      }
    };
    fetchTips();
  }, []);

  return (
    // ✅ 검색 엔진 최적화를 위해 div 대신 main 태그 사용
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
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative hover:shadow-md transition">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white">1</div>
            <h3 className="font-bold text-lg mb-3 mt-2 text-gray-800">판매 신청</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              카카오톡 채널을 통해 판매할 아이템의 사진과 통판매시 닉네임을 전송합니다.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative hover:shadow-md transition">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-2 border-white">2</div>
            <h3 className="font-bold text-lg mb-3 mt-2 text-gray-800">시세 확인 및 조율</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
                실시간 경매장 시세를 확인하여 최고의 구매가격을 제안해 드립니다.
            </p>
          </div>

          {/* Step 3 */}
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

      {/* 2. 하단 게시판 영역 */}
      <section>
        <div className="text-center mb-10">
           <h2 className="text-2xl font-black text-gray-800 flex items-center justify-center gap-2">
             <FileText className="text-gray-400"/> 추가 이용 팁 & 공지
           </h2>
           <p className="text-gray-500 mt-2 text-sm">관리자가 직접 작성한 상세 가이드입니다.</p>
        </div>

        {tipsList.length === 0 ? (
           <div className="text-center py-10 bg-gray-50 rounded-xl text-gray-400">등록된 추가 게시글이 없습니다.</div>
        ) : (
          <div className="space-y-8">
            {tipsList.map((item) => (
              <article key={item.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
                  <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                </div>
                 
                {item.thumbnail && (
                  <div className="mb-6 rounded-xl overflow-hidden border border-gray-100 bg-black/5">
                    {item.fileType === 'video' ? (
                      <video src={item.thumbnail} controls className="w-full max-h-[400px] object-contain mx-auto" />
                    ) : (
                      // ✅ 이미지 Alt 태그 강화 (SEO)
                      <img src={item.thumbnail} alt={`메이플급처 꿀팁 - ${item.title}`} className="w-full max-h-[400px] object-contain mx-auto" />
                    )}
                  </div>
                )}

                <div className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-5 rounded-xl text-sm md:text-base border border-gray-100">
                  {item.content}
                </div>
                <div className="text-right mt-3">
                  <span className="text-xs text-gray-400 font-medium">{item.date} 작성됨</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="mt-20 text-center">
        <Link href="/" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          🏠 메인으로 돌아가기
        </Link>
      </div>
    </main>
  );
}