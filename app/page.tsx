"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

export default function HomePage() {
  const kakaoLink = "https://open.kakao.com/o/sKg86b7f";
  const [recentReviews, setRecentReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(3));
      const snap = await getDocs(q);
      setRecentReviews(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchReviews();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#1e293b', color: '#fff', padding: '8px', textAlign: 'center', fontSize: '14px' }}>
        📅 {new Date().toLocaleDateString()} | 🟢 365일 24시간 정상 운영 중
      </div>
      <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', padding: '0 20px' }}>
          <Link href="/" style={{ fontSize: '26px', fontWeight: '900', color: '#2563eb', textDecoration: 'none' }}>메이플 아이템</Link>
          <div style={{ display: 'flex', gap: '30px' }}>
            <Link href="/" style={{ fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>메인</Link>
            <Link href="/tip" style={{ fontWeight: 'bold', color: '#555', textDecoration: 'none' }}>거래방법</Link>
            <Link href="/reviews" style={{ fontWeight: 'bold', color: '#555', textDecoration: 'none' }}>이용후기</Link>
            <Link href="/news" style={{ fontWeight: 'bold', color: '#555', textDecoration: 'none' }}>최신뉴스</Link>
          </div>
        </div>
      </nav>
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '30px', padding: '60px 20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginBottom: '50px' }}>
          <h1 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '20px' }}>잠자는 아이템, <span style={{ color: '#2563eb' }}>현금</span>으로!<br/>최고가 <span style={{ color: '#f59e0b' }}>85~90%</span> 매입</h1>
          <a href={kakaoLink} target="_blank" style={{ display: 'inline-block', backgroundColor: '#facc15', color: '#000', fontSize: '20px', fontWeight: '900', padding: '20px 50px', borderRadius: '50px', textDecoration: 'none' }}>⚡ 카카오톡 상담하기 ⚡</a>
        </div>
        <div style={{ textAlign: 'left', backgroundColor: '#eef2ff', padding: '40px', borderRadius: '25px' }}>
          <h2 style={{ marginBottom: '20px' }}>💬 실시간 유저 후기</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {recentReviews.map(r => (
              <div key={r.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px' }}>
                <p style={{ fontWeight: 'bold' }}>{r.name}님 ({r.server})</p>
                <p>{r.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}