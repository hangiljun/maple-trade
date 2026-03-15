import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 - 메이플급처",
  description: "메이플급처 서비스 이용약관입니다.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">이용약관</h1>
      <p className="text-sm text-gray-400 mb-8">최종 수정일: 2025년 1월 1일</p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">제1조 (목적)</h2>
          <p>본 약관은 메이플급처(이하 "서비스")가 제공하는 메이플스토리 아이템·메소 거래 중개 서비스의 이용 조건 및 절차, 서비스 이용자와 서비스 제공자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">제2조 (서비스 내용)</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>메이플스토리 아이템 및 메소 매입·판매 중개</li>
            <li>거래 관련 정보 및 시세 안내</li>
            <li>이용자 간 후기 공유 커뮤니티</li>
            <li>거래 관련 공지 및 이슈 안내</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">제3조 (이용자 의무)</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>타인을 사칭하거나 허위 정보를 제공하는 행위 금지</li>
            <li>서비스를 이용한 사기, 불법 환전, 현금화 등 불법 행위 금지</li>
            <li>타인의 명예를 훼손하거나 업무를 방해하는 행위 금지</li>
            <li>서비스의 정상적인 운영을 방해하는 행위 금지</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">제4조 (면책조항)</h2>
          <p className="text-gray-600">서비스는 이용자가 게재한 후기·댓글의 내용에 대해 책임을 지지 않습니다. 또한 천재지변, 시스템 장애, 게임사 정책 변경 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">제5조 (문의)</h2>
          <p className="text-gray-600">서비스 이용 중 문의 사항은 카카오톡 오픈채팅을 통해 접수하실 수 있습니다.</p>
        </section>

      </div>
    </div>
  );
}
