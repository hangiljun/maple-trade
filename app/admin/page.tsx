"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pw, setPw] = useState('');
  const [tab, setTab] = useState('news');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleLogin = () => pw === '1234' ? setIsAdmin(true) : alert('틀림');
  
  const handleSave = async () => {
    if (!title || !content) return;
    await addDoc(collection(db, tab), { title, content, date: new Date().toLocaleDateString(), createdAt: serverTimestamp() });
    alert('구글 DB 저장 완료!');
    setTitle(''); setContent('');
  };

  if (!isAdmin) return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="비번" />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h2>🛠️ 관리자 DB 등록</h2>
      <select onChange={e => setTab(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
        <option value="news">최신뉴스 등록</option>
        <option value="tips">거래방법 등록</option>
      </select>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="내용" style={{ width: '100%', height: '150px', marginBottom: '10px' }} />
      <button onClick={handleSave} style={{ width: '100%', padding: '15px', backgroundColor: '#2563eb', color: '#fff' }}>서버 전송</button>
    </div>
  );
}