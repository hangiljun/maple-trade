"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    // 관리자에서 저장한 데이터 불러오기
    const savedNews = JSON.parse(localStorage.getItem('maple_news') || '[]');
    setNewsList(savedNews);
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'sans-serif', color: '#333' }}>
      <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', padding: '0 20px' }}>
          <Link href="/" style={{ fontSize: '26px', fontWeight: '900', color: '#2563eb', textDecoration: 'none', letterSpacing: '-1px' }}>메이플 아이템</Link>
          <div style={{ display: 'flex', gap: '30px' }}>
            <Link href="/" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>메인</Link>
            <Link href="/tip" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>거래방법</Link>
            <Link href="/reviews" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>이용후기</Link>
            <Link href="/news" style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', borderBottom: '3px solid #2563eb', padding: '19px 0' }}>최신뉴스</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', color: '#333' }}>📰 최신 뉴스</h2>
        
        {newsList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: '#aaa' }}>
            <p>아직 등록된 뉴스가 없습니다.<br/>관리자 페이지에서 글을 등록해주세요.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {newsList.map((news: any) => (
              <div key={news.id} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 'bold' }}>{news.title}</h3>
                  <span style={{ color: '#aaa', fontSize: '14px' }}>{news.date}</span>
                </div>
                <p style={{ lineHeight: '1.6', color: '#555', whiteSpace: 'pre-line' }}>{news.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}