"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../firebase';
import { collection, addDoc, query, orderBy, getDocs, serverTimestamp } from 'firebase/firestore';

export default function ReviewsPage() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', server: '스카니아', content: '' });

  const fetchReviews = async () => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    setList(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleSave = async () => {
    if(!form.name || !form.content) return alert("내용을 입력하세요.");
    await addDoc(collection(db, 'reviews'), { ...form, createdAt: serverTimestamp(), date: new Date().toLocaleDateString() });
    alert('후기 등록 완료!');
    setForm({ ...form, content: '' });
    fetchReviews();
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily:'sans-serif' }}>
      <Link href="/">🏠 홈으로</Link>
      <h2 style={{fontSize:'28px', fontWeight:'bold', margin:'20px 0'}}>이용후기</h2>
      <div style={{ backgroundColor:'#fff', padding:'20px', borderRadius:'15px', border:'1px solid #ddd', marginBottom:'30px' }}>
        <div style={{display:'flex', gap:'10px', marginBottom:'10px'}}>
          <input placeholder="이름" value={form.name} onChange={e => setForm({...form, name: e.target.value})} style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}} />
          <select value={form.server} onChange={e => setForm({...form, server: e.target.value})} style={{padding:'10px', borderRadius:'5px', border:'1px solid #ccc'}}>
            <option>스카니아</option><option>루나</option><option>엘리시움</option><option>크로아</option>
          </select>
        </div>
        <input placeholder="후기 내용을 입력하세요" value={form.content} onChange={e => setForm({...form, content: e.target.value})} style={{width:'100%', padding:'15px', borderRadius:'5px', border:'1px solid #ccc', marginBottom:'10px'}} />
        <button onClick={handleSave} style={{width:'100%', padding:'15px', backgroundColor:'#2563eb', color:'#fff', border:'none', borderRadius:'5px', fontWeight:'bold', cursor:'pointer'}}>후기 등록</button>
      </div>
      {list.map(r => (
        <div key={r.id} style={{ borderBottom: '1px solid #eee', padding: '15px 0' }}>
          <p><b>{r.name}님 ({r.server})</b> <small style={{color:'#aaa'}}>{r.date}</small></p>
          <p style={{marginTop:'5px', color:'#555'}}>{r.content}</p>
        </div>
      ))}
    </div>
  );
}