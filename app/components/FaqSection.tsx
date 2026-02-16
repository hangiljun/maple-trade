"use client"; // ✅ 이 부분만 클라이언트에서 작동합니다.
import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

export default function FaqSection() {
  const KAKAO_LINK = "https://open.kakao.com/o/sKg86b7f";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const FAQS = [
    {
      q: "거래 절차가 어떻게 되나요?",
      a: "카카오톡으로 아이템 스크린샷을 보내주시면 실시간 경매장 시세 분석 후 견적을 드립니다. 가격 승인 시 인게임에서 즉시 거래하고, 확인 후 바로 종료 입니다."
    },
    {
      q: "정말 안전한가요? 사기는 없나요?",
      a: "저희는 수년간 무사고로 진행 했으며, 더치트 사기 이력 조회 시스템을 이용 합니다. 사고 발생 시 100% 전액 보상을 약속드립니다."
    },
    {
      q: "시세 확인후 종료까지 얼마나 걸리나요?",
      a: "시세 확인후 3분 이내로 거래종료 약속 드립니다."
    },
    {
      q: "플래티넘 카르마 가위가 없어서 아이템을 자르지 못하는데 어떻게 하나요?",
      a: "가위가 없으시면 플가를 선 지급 하니 걱정 하지 않으셔도 됩니다."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 w-full mt-4 rounded-t-[40px] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-blue-600 font-bold text-sm tracking-wider flex items-center justify-center gap-1 mb-2">
            <HelpCircle size={16} /> FAQ
          </span>
          <h2 className="text-3xl font-black text-gray-900">자주 묻는 질문</h2>
          <p className="text-gray-500 mt-2">고객님들이 자주 문의하시는 내용을 정리했습니다.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition"
              >
                <span className="font-bold text-gray-800 flex items-center gap-3">
                  <span className="text-blue-600 font-black text-lg">Q.</span>
                  {faq.q}
                </span>
                {openFaq === index ? <ChevronUp className="text-gray-400"/> : <ChevronDown className="text-gray-400"/>}
              </button>
              <div 
                className={`bg-gray-50 px-5 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? "max-h-40 py-5 opacity-100" : "max-h-0 py-0 opacity-0"}`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 mb-4 text-sm">더 궁금한 점이 있으신가요?</p>
          <a 
            href={KAKAO_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#FEE500] text-[#3A1D1D] px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition shadow-md"
          >
            <MessageCircle size={18} fill="#3A1D1D"/> 카톡으로 빠른 문의하기
          </a>
        </div>
      </div>
    </section>
  );
}