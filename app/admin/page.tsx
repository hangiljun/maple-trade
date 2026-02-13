"use client";
import React, { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pw, setPw] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    if (!title || !content) return alert("내용을 입력해주세요.");
    try {
      // 정확히 'news' 보관함에 저장합니다.
      await addDoc(collection(db, "news"), {
        title,
        content,
        date: new Date().toLocaleDateString('ko-KR'),
        createdAt: serverTimestamp(),
      });
      alert("구글 서버 저장 성공!");
      setTitle(''); setContent('');
    } catch (e) {
      alert("저장 실패: " + e);
    }
  };

  if (!isAdmin) return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <input type="password" placeholder="비번" onChange={e => setPw(e.target.value)} style={{ padding: '10px' }} />
      <button onClick={() => pw === '1234' ? setIsAdmin(true) : alert('틀림')} style={{ padding: '10px' }}>로그인</button>
    </div>
  );

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px' }}>
      <h2>🛠️ 최신뉴스 관리자</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="내용" style={{ width: '100%', height: '200px', padding: '10px' }} />
      <button onClick={handleSave} style={{ width: '100%', padding: '15px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>서버 전송</button>
    </div>
  );
}