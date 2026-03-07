import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '메이플급처 - 메이플스토리 아이템/메소 안전거래';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #1e40af 0%, #3730a3 50%, #1e3a8a 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 배경 원형 장식 */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            right: '-80px',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }}
        />

        {/* 뱃지 */}
        <div
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '999px',
            padding: '8px 24px',
            color: '#bfdbfe',
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          ✅ 365일 24시간 운영
        </div>

        {/* 메인 타이틀 */}
        <div
          style={{
            color: '#ffffff',
            fontSize: '80px',
            fontWeight: 900,
            letterSpacing: '-2px',
            lineHeight: 1.1,
            textAlign: 'center',
            display: 'flex',
          }}
        >
          메이플
          <span style={{ color: '#60a5fa' }}>급처</span>
        </div>

        {/* 서브 타이틀 */}
        <div
          style={{
            color: '#bfdbfe',
            fontSize: '30px',
            fontWeight: 500,
            marginTop: '16px',
            textAlign: 'center',
          }}
        >
          메이플스토리 아이템 · 메소 안전거래
        </div>

        {/* 구분선 */}
        <div
          style={{
            width: '80px',
            height: '4px',
            background: '#60a5fa',
            borderRadius: '2px',
            margin: '28px 0',
          }}
        />

        {/* 특징 태그들 */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['수수료 0%', '실시간 시세', '전 서버 즉시 거래'].map((text) => (
            <div
              key={text}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '10px 20px',
                color: '#e0f2fe',
                fontSize: '22px',
                fontWeight: 700,
                display: 'flex',
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* 도메인 */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            color: 'rgba(255,255,255,0.4)',
            fontSize: '18px',
          }}
        >
          www.메이플급처.com
        </div>
      </div>
    ),
    { ...size }
  );
}
