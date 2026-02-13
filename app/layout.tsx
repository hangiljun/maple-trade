import React from 'react';

export const metadata = {
  title: '메이플급처.com',
  description: '메이플스토리 아이템 급처 매입 전문',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}