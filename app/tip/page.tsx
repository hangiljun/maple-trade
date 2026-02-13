export default function TipPage() {
  // 관리자가 설명하는 거래 단계 설정
  const steps = [
    { 
      title: "01. 상담 신청", 
      desc: "카카오톡 채널이나 오픈채팅 주소를 클릭하여 매입을 원하는 아이템의 스크린샷과 정보를 전달합니다.",
      icon: "💬"
    },
    { 
      title: "02. 실시간 시세 감정", 
      desc: "관리자가 현재 메이플스토리 시장 시세를 즉시 분석하여 최적의 매입 가격을 제시해 드립니다.",
      icon: "🔍"
    },
    { 
      title: "03. 아이템 전달", 
      desc: "제시한 금액에 동의하시면, 게임 내 지정된 장소(자유시장 등)에서 안전하게 아이템을 전달합니다.",
      icon: "🎁"
    },
    { 
      title: "04. 즉시 입금 완료", 
      desc: "아이템 확인 후 고객님의 계좌로 5분 이내에 신속하게 현금 입금이 완료됩니다.",
      icon: "💳"
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* 상단 타이틀 구역 */}
      <section className="text-center py-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">이용안내 & 거래방법</h2>
        <p className="text-gray-500">메이플급처템.com은 투명하고 신속한 거래 절차를 준수합니다.</p>
      </section>

      {/* 단계별 카드 구역 */}
      <div className="grid gap-6">
        {steps.map((step) => (
          <div key={step.title} className="flex flex-col md:flex-row items-start gap-6 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition">
            <div className="text-4xl bg-orange-50 w-16 h-16 flex items-center justify-center rounded-2xl">
              {step.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-orange-500 mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 주의사항 (관리자 작성 공지 구역) */}
      <div className="bg-gray-900 text-white p-8 rounded-3xl space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span className="text-red-500">⚠️</span> 필수 확인 주의사항
        </h3>
        <ul className="space-y-3 text-gray-400 text-sm">
          <li className="flex items-start gap-2">
            • 관리자는 절대 게임 내에서 먼저 말을 걸어 아이템을 요구하지 않습니다.
          </li>
          <li className="flex items-start gap-2">
            • 반드시 홈페이지 상단의 공식 카카오톡 채널 주소를 통해서만 상담을 진행하세요.
          </li>
          <li className="flex items-start gap-2">
            • 3자 사기 방지를 위해 본인 명의의 계좌로만 입금이 가능합니다.
          </li>
          <li className="flex items-start gap-2">
            • 미성년자는 부모님 혹은 법정대리인의 동의 없이 이용이 불가합니다.
          </li>
        </ul>
      </div>

      {/* 하단 버튼 */}
      <div className="text-center">
        <a 
          href="/" 
          className="inline-block bg-orange-500 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition shadow-lg shadow-orange-200"
        >
          지금 바로 상담 시작하기
        </a>
      </div>
    </div>
  );
}