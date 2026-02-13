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

  const handleLogin = () => { if (pw === '1234') setIsAdmin(true); else alert('비밀번호 틀림'); };

  const handleSave = async () => {
    if (!title || !content) return alert("내용을 입력하세요.");
    try {
      await addDoc(collection(db, tab), {
        title,
        content,
        date: new Date().toLocaleDateString(),
        createdAt: serverTimestamp(),
      });
      alert("구글 데이터베이스 저장 성공!");
      setTitle(''); setContent('');
    } catch (e) {
      alert("저장 실패: " + e);
    }
  };

  if (!isAdmin) return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
      <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="비번" style={{padding:'10px'}} />
      <button onClick={handleLogin} style={{padding:'10px'}}>로그인</button>
    </div>
  );

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{fontWeight:'bold', fontSize:'24px', marginBottom:'20px'}}>🛠️ 실시간 DB 관리자</h2>
      <select onChange={e => setTab(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '10px' }}>
        <option value="news">최신뉴스 등록</option>
        <option value="tips">거래방법 등록</option>
      </select>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" style={{ width: '100%', padding: '15px', marginBottom: '10px', border:'1px solid #ddd' }} />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="내용" style={{ width: '100%', height: '200px', padding: '15px', marginBottom: '10px', border:'1px solid #ddd' }} />
      <button onClick={handleSave} style={{ width: '100%', padding: '20px', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>구글 서버로 전송</button>
      <div style={{marginTop:'20px'}}><Link href="/">🏠 홈으로 돌아가기</Link></div>
    </div>
  );
}