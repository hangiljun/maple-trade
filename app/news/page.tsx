"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function NewsPage() {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setList(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetch();
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
      <Link href="/">🏠 홈으로</Link>
      <h2 style={{ margin: '20px 0' }}>📰 최신 뉴스</h2>
      {list.map(n => (
        <div key={n.id} style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '15px', border: '1px solid #ddd' }}>
          <h3>{n.title}</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{n.content}</p>
          <small>{n.date}</small>
        </div>
      ))}
    </div>
  );
}