"use client";
import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === '1234') {
      setIsAdmin(true);
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  if (!isAdmin) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '300px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold' }}>관리자 로그인</h2>
          <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px' }} />
          <button onClick={handleLogin} style={{ width: '100%', padding: '10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>로그인</button>
          <div style={{textAlign: 'center', marginTop: '20px'}}><Link href="/">홈으로 돌아가기</Link></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>관리자 대시보드</h1>
      <p>여기서 글을 작성하고 삭제할 수 있습니다.</p>
      {/* 글쓰기 기능은 DB 연결 후에 완벽하게 작동합니다. */}
      <Link href="/" style={{ display: 'inline-block', marginTop: '20px', textDecoration: 'underline' }}>사이트로 돌아가기</Link>
    </div>
  );
}