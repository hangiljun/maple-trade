"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const kakaoLink = "https://open.kakao.com/o/sKg86b7f";
  const [currentDate, setCurrentDate] = useState('');

  // 날짜 계산
  useEffect(() => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
    setCurrentDate(dateStr);
  }, []);

  // 임시 후기 데이터 (나중엔 서버에서 불러옴)
  const recentReviews = [
    { id: 1, server: '스카니아', name: '박**', content: '새벽에도 바로 답장주시네요. 최고!' },
    { id: 2, server: '루나', name: '이**', content: '다른 곳보다 확실히 더 쳐줍니다.' },
    { id: 3, server: '엘리시움', name: '김**', content: '깔끔하게 쿨거했습니다.' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'sans-serif', color: '#333' }}>
      
      {/* 2. 전광판 (상단 띠) */}
      <div style={{ backgroundColor: '#1e293b', color: '#fff', fontSize: '14px', padding: '8px 0', textAlign: 'center', letterSpacing: '1px' }}>
        📅 {currentDate} | 🟢 <span style={{ color: '#4ade80', fontWeight: 'bold' }}>365일 24시간 연중무휴</span> 정상 운영 중입니다.
      </div>

      {/* 1. 네비게이션 (한글 메뉴) */}
      <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', padding: '0 20px' }}>
          <Link href="/" style={{ fontSize: '26px', fontWeight: '900', color: '#2563eb', textDecoration: 'none', letterSpacing: '-1px' }}>
            메이플 아이템
          </Link>
          <div style={{ display: 'flex', gap: '30px' }}>
            <Link href="/" style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', borderBottom: '3px solid #2563eb', padding: '19px 0' }}>메인</Link>
            <Link href="/tip" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>거래방법</Link>
            <Link href="/reviews" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>이용후기</Link>
            <Link href="/news" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>최신뉴스</Link>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
        
        {/* 히어로 섹션 */}
        <div style={{ backgroundColor: '#fff', borderRadius: '30px', padding: '80px 20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginBottom: '60px', border: '1px solid #edf2f7' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px', lineHeight: '1.3', color: '#1a202c' }}>
            잠자는 아이템, <span style={{ color: '#2563eb' }}>현금</span>으로!<br/>
            업계 최고가 <span style={{ color: '#f59e0b' }}>85~90%</span> 매입
          </h1>
          <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '50px', fontWeight: '500' }}>
            챌린저스, 일반월드, 에오스, 헬리오스 전 서버 즉시 매입
          </p>
          <a href={kakaoLink} target="_blank" style={{ display: 'inline-block', backgroundColor: '#facc15', color: '#000', fontSize: '24px', fontWeight: '900', padding: '25px 60px', borderRadius: '60px', textDecoration: 'none', boxShadow: '0 10px 20px rgba(250, 204, 21, 0.4)', transition: 'transform 0.2s' }}>
            ⚡ 카카오톡 상담하기 ⚡
          </a>
        </div>

        {/* 5. 신념 섹션 (디자인 강조) */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '40px', color: '#333' }}>Why? 메이플 아이템인가요?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {/* 신뢰 */}
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderTop: '5px solid #3b82f6' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🤝</div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: '#3b82f6' }}>절대 신뢰</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>수년간 쌓아온 거래 내역.<br/>한 번의 사고도 없는 무사고 인증 업체</p>
            </div>
            {/* 신속 */}
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderTop: '5px solid #ef4444' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>⚡</div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: '#ef4444' }}>초고속 정산</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>아이템 확인 즉시 3분 이내 입금.<br/>기다림 없는 시원한 거래</p>
            </div>
            {/* 정확 */}
            <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', borderTop: '5px solid #22c55e' }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>📊</div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: '#22c55e' }}>정확한 시세</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>업계 데이터를 기반으로<br/>가장 합리적이고 높은 가격 제시</p>
            </div>
          </div>
        </div>

        {/* 4. 하단 이용후기 연동 */}
        <div style={{ textAlign: 'left', backgroundColor: '#eef2ff', padding: '50px', borderRadius: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>💬 실시간 유저 후기</h2>
            <Link href="/reviews" style={{ color: '#2563eb', fontWeight: 'bold', textDecoration: 'none' }}>더보기 &gt;</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {recentReviews.map((review) => (
               <div key={review.id} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '20px', boxShadow: '0 2px 5px rgba(0,0,0,0.03)' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                   <span style={{ fontWeight: 'bold', color: '#333' }}>{review.name}님 ({review.server})</span>
                   <span style={{ fontSize: '12px', color: '#999' }}>방금 전</span>
                 </div>
                 <p style={{ color: '#555', fontSize: '15px' }}>{review.content}</p>
               </div>
            ))}
          </div>
        </div>

      </div>
      
      <footer style={{ textAlign: 'center', padding: '60px 20px', color: '#a0aec0', fontSize: '14px', marginTop: '80px', borderTop: '1px solid #e2e8f0' }}>
        <p>© 2026 MapleItem. All Rights Reserved.</p>
      </footer>
    </div>
  );
}