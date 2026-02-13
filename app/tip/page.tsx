"use client";
import React from 'react';
import Link from 'next/link';

export default function TipPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'sans-serif', color: '#333' }}>
      {/* 네비게이션 */}
      <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', padding: '0 20px' }}>
          <Link href="/" style={{ fontSize: '26px', fontWeight: '900', color: '#2563eb', textDecoration: 'none', letterSpacing: '-1px' }}>메이플 아이템</Link>
          <div style={{ display: 'flex', gap: '30px' }}>
            <Link href="/" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>Home</Link>
            <Link href="/tip" style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', borderBottom: '3px solid #2563eb', padding: '19px 0' }}>Tip</Link>
            <Link href="/reviews" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>Reviews</Link>
            <Link href="/news" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>News</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ backgroundColor: '#fff', padding: '60px', borderRadius: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', color: '#2d3748' }}>쉽고 빠른 거래 방법</h2>
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