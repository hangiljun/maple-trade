import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 - 메이플급처",
  description: "메이플급처 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">개인정보처리방침</h1>
      <p className="text-sm text-gray-400 mb-8">최종 수정일: 2025년 1월 1일</p>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8 text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">1. 수집하는 개인정보 항목</h2>
          <p className="text-gray-600">메이플급처는 서비스 이용 시 다음과 같은 정보를 수집할 수 있습니다.</p>
          <ul className="list-disc list-inside space-y-1 text-gray-600 mt-2">
            <li>이용후기 작성 시: 닉네임(작성자명), 작성 내용</li>
            <li>댓글 작성 시: 닉네임, 댓글 내용</li>
            <li>자동 수집: 접속 IP, 방문 일시, 서비스 이용 기록 (서버 로그)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">2. 개인정보 수집 및 이용 목적</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>이용후기 및 댓글 서비스 제공</li>
            <li>서비스 품질 개선 및 통계 분석</li>
            <li>부정 이용 방지 및 서비스 안정성 확보</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">3. 개인정보 보유 및 이용 기간</h2>
          <p className="text-gray-600">수집된 개인정보는 서비스 이용 목적이 달성되거나 이용자가 삭제를 요청할 때까지 보유합니다. 관련 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관됩니다.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">4. 개인정보의 제3자 제공</h2>
          <p className="text-gray-600">메이플급처는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 법령의 규정에 의거하거나 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우는 예외로 합니다.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">5. 개인정보 처리 위탁</h2>
          <p className="text-gray-600">서비스는 Firebase(Google LLC)를 데이터 저장소로 사용하며, Google의 개인정보처리방침에 따라 데이터가 관리됩니다.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">6. 이용자의 권리</h2>
          <p className="text-gray-600">이용자는 언제든지 작성한 후기·댓글의 삭제를 요청할 수 있습니다. 삭제 요청은 카카오톡 오픈채팅을 통해 접수하시면 처리해 드립니다.</p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">7. 개인정보 보호책임자</h2>
          <p className="text-gray-600">개인정보 관련 문의사항은 카카오톡 오픈채팅을 통해 접수하실 수 있습니다.</p>
        </section>

      </div>
    </div>
  );
}
