"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TipPage() {
  const [tipList, setTipList] = useState<any[]>([]);

  useEffect(() => {
    const savedTips = JSON.parse(localStorage.getItem('maple_tips') || '[]');
    setTipList(savedTips);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'sans-serif', color: '#333' }}>
      <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', padding: '0 20px' }}>
          <Link href="/" style={{ fontSize: '26px', fontWeight: '900', color: '#2563eb', textDecoration: 'none', letterSpacing: '-1px' }}>메이플 아이템</Link>
          <div style={{ display: 'flex', gap: '30px' }}>
            <Link href="/" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>메인</Link>
            <Link href="/tip" style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', borderBottom: '3px solid #2563eb', padding: '19px 0' }}>거래방법</Link>
            <Link href="/reviews" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>이용후기</Link>
            <Link href="/news" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>최신뉴스</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', color: '#333' }}>💡 거래 이용 안내</h2>
        
        {/* 관리자 등록 팁 리스트 */}
        {tipList.length > 0 && (
          <div style={{ marginBottom: '50px' }}>
             {tipList.map((tip: any) => (
                <div key={tip.id} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '2px solid #2563eb', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px', color: '#2563eb' }}>[공지] {tip.title}</h3>
                  <p style={{ lineHeight: '1.6', color: '#555', whiteSpace: 'pre-line' }}>{tip.content}</p>
                </div>
             ))}
          </div>
        )}

        {/* 기본 고정 가이드 */}
        <div style={{ backgroundColor: '#fff', padding: '60px', borderRadius: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '30px', backgroundColor: '#f7fafc', borderRadius: '20px' }}>
                 <div style={{ backgroundColor: '#3b82f6', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
                 <div>
                   <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>카카오톡 문의</h4>
                   <p style={{ color: '#4a5568' }}>판매하실 아이템의 사진과 희망 가격을 보내주세요.</p>
                 </div>
               </div>
               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '30px', backgroundColor: '#f7fafc', borderRadius: '20px' }}>
                 <div style={{ backgroundColor: '#3b82f6', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
                 <div>
                   <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>시세 확인 및 조율</h4>
                   <p style={{ color: '#4a5568' }}>전문 상담원이 현재 시세를 확인하여 최고가 매입액을 제시합니다.</p>
                 </div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}