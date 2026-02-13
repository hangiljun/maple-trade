"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pw, setPw] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleLogin = () => { if (pw === '1234') setIsAdmin(true); else alert('비밀번호 틀림'); };

  const handleSave = async () => {
    if (!title || !content) return alert("제목과 내용을 입력하세요.");
    try {
      // 보관함 이름을 'news'로 정확히 지정합니다.
      await addDoc(collection(db, "news"), {
        title: title,
        content: content,
        date: new Date().toLocaleDateString('ko-KR'),
        createdAt: serverTimestamp(),
      });
      alert("구글 데이터베이스 저장 성공!");
      setTitle(''); setContent('');
    } catch (e) {
      alert("저장 에러: " + e);
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
      <h2 style={{fontWeight:'bold', fontSize:'24px', marginBottom:'20px'}}>🛠️ 최신뉴스 관리자</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목을 입력하세요" style={{ width: '100%', padding: '15px', marginBottom: '10px', border:'1px solid #ddd', borderRadius:'10px' }} />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="내용을 입력하세요" style={{ width: '100%', height: '200px', padding: '15px', marginBottom: '10px', border:'1px solid #ddd', borderRadius:'10px' }} />
      <button onClick={handleSave} style={{ width: '100%', padding: '20px', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>최신뉴스 등록하기</button>
      <div style={{marginTop:'20px'}}><Link href="/">🏠 홈으로 돌아가기</Link></div>
    </div>
  );
}