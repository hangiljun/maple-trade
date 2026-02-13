"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([
    { id: 1, server: '스카니아', name: '김**', content: '쿨거래 감사합니다. 바로 정산해주시네요!', date: '2026-02-14' },
    { id: 2, server: '루나', name: '이**', content: '챌린저스 서버도 매입해주셔서 좋았어요.', date: '2026-02-14' },
  ]);
  const [newReview, setNewReview] = useState({ server: '스카니아', name: '', content: '' });

  const handleAddReview = () => {
    if (!newReview.name || !newReview.content) return alert("내용을 입력해주세요!");
    const review = {
      id: Date.now(),
      server: newReview.server,
      name: newReview.name,
      content: newReview.content,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([review, ...reviews]);
    setNewReview({ server: '스카니아', name: '', content: '' });
    alert("후기가 등록되었습니다!");
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'sans-serif', color: '#333' }}>
      <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', padding: '0 20px' }}>
          <Link href="/" style={{ fontSize: '26px', fontWeight: '900', color: '#2563eb', textDecoration: 'none', letterSpacing: '-1px' }}>메이플 아이템</Link>
          <div style={{ display: 'flex', gap: '30px' }}>
            <Link href="/" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>Home</Link>
            <Link href="/tip" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>Tip</Link>
            <Link href="/reviews" style={{ fontSize: '18px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none', borderBottom: '3px solid #2563eb', padding: '19px 0' }}>Reviews</Link>
            <Link href="/news" style={{ fontSize: '18px', fontWeight: 'bold', color: '#555', textDecoration: 'none', padding: '19px 0' }}>News</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', color: '#2d3748' }}>실시간 거래 후기</h2>
        
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', marginBottom: '40px', border: '2px solid #e2e8f0' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <select value={newReview.server} onChange={(e) => setNewReview({...newReview, server: e.target.value})} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e0' }}>
              <option>스카니아</option><option>루나</option><option>엘리시움</option><option>크로아</option>
            </select>
            <input type="text" placeholder="이름" value={newReview.name} onChange={(e) => setNewReview({...newReview, name: e.target.value})} style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e0', width: '100px' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="내용 입력" value={newReview.content} onChange={(e) => setNewReview({...newReview, content: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e0' }} />
            <button onClick={handleAddReview} style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>등록</button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '15px' }}>
          {reviews.map((review) => (
            <div key={review.id} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontWeight: 'bold' }}>[{review.server}] {review.name}님</span>
                <span style={{ color: '#aaa' }}>{review.date}</span>
              </div>
              <p>{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}