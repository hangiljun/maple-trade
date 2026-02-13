"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  
  // 데이터 상태
  const [activeTab, setActiveTab] = useState('news'); // news or tip
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  // 로그인 처리
  const handleLogin = () => {
    if (password === '1234') setIsAdmin(true);
    else alert('비밀번호가 틀렸습니다.');
  };

  // 글 등록 (LocalStorage 사용)
  const handleSubmit = () => {
    if(!title || !content) return alert('제목과 내용을 입력하세요.');
    
    // 기존 데이터 가져오기
    const storageKey = activeTab === 'news' ? 'maple_news' : 'maple_tips';
    const existingData = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // 새 데이터 추가
    const newData = {
      id: Date.now(),
      title,
      content,
      date: new Date().toISOString().split('T')[0]
    };
    
    localStorage.setItem(storageKey, JSON.stringify([newData, ...existingData]));
    
    // 초기화
    setTitle('');
    setContent('');
    setStatusMsg(`✅ ${activeTab === 'news' ? '뉴스' : '팁'}가 등록되었습니다! 사이트에서 확인해보세요.`);
    setTimeout(() => setStatusMsg(''), 3000);
  };

  // 글 삭제 (전체 삭제 기능만 임시 제공)
  const handleClearAll = () => {
    if(confirm('정말 모든 글을 삭제하시겠습니까?')) {
       const storageKey = activeTab === 'news' ? 'maple_news' : 'maple_tips';
       localStorage.removeItem(storageKey);
       alert('삭제되었습니다.');
    }
  }

  // 로그인 전 화면
  if (!isAdmin) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
        <div style={{ backgroundColor: '#fff', padding: '50px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '350px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '30px', fontWeight: 'bold' }}>관리자 접속</h2>
          <input type="password" placeholder="비밀번호 (1234)" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '15px', border: '1px solid #ddd', borderRadius: '10px', fontSize: '16px' }} />
          <button onClick={handleLogin} style={{ width: '100%', padding: '15px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>로그인</button>
          <div style={{ marginTop: '20px' }}><Link href="/">홈으로 돌아가기</Link></div>
        </div>
      </div>
    );
  }

  // 로그인 후 화면 (대시보드)
  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>🛠️ 관리자 모드</h1>
        <Link href="/" style={{ padding: '10px 20px', backgroundColor: '#eee', borderRadius: '5px', textDecoration: 'none', color: '#333' }}>사이트로 나가기</Link>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('news')} style={{ flex: 1, padding: '15px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'news' ? '#2563eb' : '#eee', color: activeTab === 'news' ? '#fff' : '#333' }}>📢 최신뉴스 관리</button>
        <button onClick={() => setActiveTab('tip')} style={{ flex: 1, padding: '15px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', backgroundColor: activeTab === 'tip' ? '#2563eb' : '#eee', color: activeTab === 'tip' ? '#fff' : '#333' }}>💡 거래방법(팁) 관리</button>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', border: '2px solid #e2e8f0' }}>
        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
          {activeTab === 'news' ? '새로운 뉴스 등록' : '새로운 거래방법 등록'}
        </h3>
        
        <input 
          type="text" 
          placeholder="제목을 입력하세요" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={{ width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd' }} 
        />
        <textarea 
          placeholder="내용을 입력하세요" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          style={{ width: '100%', height: '200px', padding: '15px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd' }} 
        />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleSubmit} style={{ flex: 1, padding: '15px', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>등록하기</button>
          <button onClick={handleClearAll} style={{ padding: '15px', backgroundColor: '#ef4444', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>전체 초기화</button>
        </div>

        {statusMsg && <p style={{ marginTop: '20px', color: 'green', fontWeight: 'bold', textAlign: 'center' }}>{statusMsg}</p>}
      </div>
    </div>
  );
}