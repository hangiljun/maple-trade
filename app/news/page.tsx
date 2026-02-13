"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function NewsPage() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실시간으로 데이터를 감시하여 가져오는 방식(onSnapshot)으로 변경
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setList(data);
      setLoading(false);
    }, (error) => {
      console.error("데이터 로딩 에러:", error);
      setLoading(false);
    });

    return () => unsubscribe(); // 페이지를 나갈 때 감시 종료
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'sans-serif' }}>
      <nav style={{ backgroundColor: '#fff', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>메이플 아이템</Link>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#555' }}>메인</Link>
            <Link href="/news" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>최신뉴스</Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>📰 최신 뉴스</h2>
        
        {loading ? (
          <p style={{textAlign:'center', padding:'50px'}}>데이터를 불러오는 중입니다...</p>
        ) : list.length === 0 ? (
          <p style={{textAlign:'center', padding:'50px', color:'#aaa'}}>등록된 소식이 없습니다.</p>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {list.map(n => (
              <div key={n.id} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom:'15px' }}>{n.title}</h3>
                <p style={{ color: '#555', whiteSpace: 'pre-line', lineHeight: '1.6' }}>{n.content}</p>
                <div style={{marginTop:'15px', fontSize:'13px', color:'#aaa'}}>{n.date}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}