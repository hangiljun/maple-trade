import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용안내 및 꿀팁 - 메이플스토리 안전거래 가이드",
  description: "메이플급처 이용 방법, 판매/구매 절차, 사기 예방 꿀팁, 그리고 메소 거래 시 주의사항을 자세히 알려드립니다.",
};

export default function TipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}