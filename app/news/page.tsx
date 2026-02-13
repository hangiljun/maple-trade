"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function NewsPage() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    // news 보관함을 실시간 감시합니다.
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setList(newsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '20px' }}>
      <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>🏠 홈으로</Link>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '20px 0' }}>📰 최신 뉴스</h2>
      
      {list.length === 0 ? (
        <p style={{ color: '#aaa', textAlign: 'center', padding: '50px' }}>등록된 소식이 없습니다.</p>
      ) : (
        list.map((n) => (
          <div key={n.id} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', marginBottom: '15px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>{n.title}</h3>
            <p style={{ color: '#555', whiteSpace: 'pre-line', lineHeight: '1.6' }}>{n.content}</p>
            <div style={{ marginTop: '15px', fontSize: '13px', color: '#ccc' }}>{n.date}</div>
          </div>
        ))
      )}
    </div>
  );
}