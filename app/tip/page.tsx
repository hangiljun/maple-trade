import Link from "next/link";
import { ArrowRight, ShieldCheck, MessageCircle, CreditCard, Gift } from "lucide-react";

export default function TipPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">이용안내</h1>
        <p className="text-gray-500 text-lg">메이플급처템에서 안전하고 빠르게 거래하는 방법입니다.</p>
      </div>

      {/* 판매자 가이드 */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-blue-600 mb-8 flex items-center gap-2">
          <span className="bg-blue-100 p-2 rounded-lg"><Gift className="w-6 h-6"/></span>
          아이템 판매 방법
        </h2>
        
        <div className="grid gap-8 md:grid-cols-3">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">1</div>
            <h3 className="font-bold text-lg mb-3 mt-2">판매 신청</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              카카오톡 또는 디스코드 채널을 통해 판매할 아이템의 스크린샷과 희망 가격을 전송합니다.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">2</div>
            <h3 className="font-bold text-lg mb-3 mt-2">시세 확인 및 조율</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              전문 매니저가 실시간 시세를 확인하여 최적의 매입가를 제안해 드립니다.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl border shadow-sm relative">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">3</div>
            <h3 className="font-bold text-lg mb-3 mt-2">거래 및 입금</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              인게임에서 물품 인계 후, 5분 이내로 판매 대금이 즉시 입금됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* 구매자 가이드 */}
      <div>
        <h2 className="text-2xl font-bold text-green-600 mb-8 flex items-center gap-2">
          <span className="bg-green-100 p-2 rounded-lg"><CreditCard className="w-6 h-6"/></span>
          아이템 구매 방법
        </h2>

        <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <MessageCircle className="text-gray-400 mt-1 min-w-[24px]" />
                <div>
                    <strong className="block text-gray-800 mb-1">구매 문의</strong>
                    <p className="text-gray-600 text-sm">원하시는 아이템이 있다면 '메이플급처템' 카카오톡으로 재고 문의를 남겨주세요.</p>
                </div>
            </div>
            <div className="flex justify-center">
                <ArrowRight className="text-gray-300 rotate-90 md:rotate-0" />
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <CreditCard className="text-gray-400 mt-1 min-w-[24px]" />
                <div>
                    <strong className="block text-gray-800 mb-1">결제 진행</strong>
                    <p className="text-gray-600 text-sm">안내받은 계좌로 입금하시거나, 안전거래 사이트를 통해 결제를 진행합니다.</p>
                </div>
            </div>
             <div className="flex justify-center">
                <ArrowRight className="text-gray-300 rotate-90 md:rotate-0" />
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <ShieldCheck className="text-gray-400 mt-1 min-w-[24px]" />
                <div>
                    <strong className="block text-gray-800 mb-1">아이템 수령</strong>
                    <p className="text-gray-600 text-sm">인게임 내 지정된 장소에서 안전하게 아이템을 수령합니다.</p>
                </div>
            </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link href="/" className="inline-block bg-gray-900 text-white px-8 py-4 rounded-full font-bold hover:bg-gray-800 transition">
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
}