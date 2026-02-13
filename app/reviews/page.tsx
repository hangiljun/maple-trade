"use client";
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, query, orderBy, getDocs, serverTimestamp } from 'firebase/firestore';

export default function ReviewsPage() {
  const [list, setList] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', server: '스카니아', content: '' });

  const fetch = async () => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    setList(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    await addDoc(collection(db, 'reviews'), { ...form, createdAt: serverTimestamp() });
    alert('후기 등록!'); fetch(); setForm({ ...form, content: '' });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
      <h2>이용후기</h2>
      <div style={{ marginBottom: '30px' }}>
        <input placeholder="이름" onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="내용" onChange={e => setForm({...form, content: e.target.value})} />
        <button onClick={handleSave}>등록</button>
      </div>
      {list.map(r => <div key={r.id} style={{ borderBottom: '1px solid #eee', padding: '10px' }}><b>{r.name}</b>: {r.content}</div>)}
    </div>
  );
}