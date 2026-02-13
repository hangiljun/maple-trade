"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export default function NewsPage() {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        setList(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) { console.error(e); }
    };
    fetchNews();
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
        {list.length === 0 ? <p style={{textAlign:'center', padding:'50px', color:'#aaa'}}>등록된 소식이 없습니다.</p> : 
          list.map(n => (
            <div key={n.id} style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom:'10px' }}>{n.title}</h3>
              <p style={{ color: '#555', whiteSpace: 'pre-line', lineHeight: '1.6' }}>{n.content}</p>
              <small style={{color:'#aaa'}}>{n.date}</small>
            </div>
          ))
        }
      </div>
    </div>
  );
}