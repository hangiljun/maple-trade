"use client";
import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  const kakaoLink = "https://open.kakao.com/o/sKg86b7f";

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'sans-serif', color: '#333' }}>
      {/* 네비게이션 (공통) */}
      <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', padding: '0 20px' }}>
          <Link href="/" style={{ fontSize: '26px', fontWeight: '900', color: '#2563eb', textDecoration: 'none', letterSpacing: '-1px' }}>
            메이플 아이템
          </Link>
          <div style={{ display: 'flex', gap: '30px' }}>
            <Link href="/" style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', borderBottom: '3px solid #2563eb', padding: '19px 0' }}>Home</Link>
            <Link href="/tip" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>Tip</Link>
            <Link href="/reviews" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>Reviews</Link>
            <Link href="/news" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>News</Link>
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '30px', padding: '80px 20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginBottom: '50px', border: '1px solid #edf2f7' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px', lineHeight: '1.3', color: '#1a202c' }}>
            잠자는 아이템, <span style={{ color: '#2563eb' }}>빠른 처분</span><br/>
            업계 최고가 <span style={{ color: '#f59e0b' }}>85~90%</span> 구매 보장
          </h1>
          <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '50px', fontWeight: '500' }}>
            챌린저스, 일반월드, 에오스, 헬리오스 모든 급처템 구매합니다.
          </p>
          <a href={kakaoLink} target="_blank" style={{ display: 'inline-block', backgroundColor: '#facc15', color: '#000', fontSize: '24px', fontWeight: '900', padding: '25px 60px', borderRadius: '60px', textDecoration: 'none', boxShadow: '0 10px 20px rgba(250, 204, 21, 0.4)', transition: 'transform 0.2s' }}>
            ⚡ 카톡으로 시세 확인하기 ⚡
          </a>
        </div>

        {/* 특징 카드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderTop: '6px solid #3b82f6' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚀</div>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>초고속 거래</h3>
            <p style={{ color: '#718096', lineHeight: '1.6' }}>아이템 확인 후 지체 없이<br/>즉시 정산해 드립니다.</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderTop: '6px solid #f59e0b' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚖️</div>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>아이템 시세 확인</h3>
            <p style={{ color: '#718096', lineHeight: '1.6' }}>빠른 거래를 위해 실시간 시세를<br/>투명하게 안내해 드립니다.</p>
          </div>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderTop: '6px solid #10b981' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🛡️</div>
            <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>안전한 매입</h3>
            <p style={{ color: '#718096', lineHeight: '1.6' }}>수천 건의 거래 내역이 증명하는<br/>신뢰도 1위 사이트입니다.</p>
          </div>
        </div>
      </div>
      
      <footer style={{ textAlign: 'center', padding: '60px 20px', color: '#a0aec0', fontSize: '14px', marginTop: '80px', borderTop: '1px solid #e2e8f0' }}>
        <p>© 2026 MapleItem. All Rights Reserved.</p>
      </footer>
    </div>
  );
}