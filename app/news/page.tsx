"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function NewsPage() {
  // <any[]> 라고 적어서 "어떤 데이터든 괜찮다"고 안심시킵니다.
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setList(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '20px' }}>
      <Link href="/" style={{ textDecoration: 'none', color: '#2563eb' }}>🏠 홈으로</Link>
      <h2 style={{ margin: '20px 0' }}>📰 최신 뉴스</h2>
      {list.map((n: any) => ( // 여기서 (n: any)가 빨간 줄을 없애줍니다.
        <div key={n.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '15px', border: '1px solid #ddd' }}>
          <h3>{n.title}</h3>
          <p>{n.content}</p>
          <small>{n.date}</small>
        </div>
      ))}
    </div>
  );
}