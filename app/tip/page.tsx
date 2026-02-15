"use client";
import React, { useState, useEffect } from "react";
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function TipPage() {
  const [tipsList, setTipsList] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, "tips"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTipsList(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-gray-900 mb-2">💡 이용 안내 (거래 방법)</h1>
        <p className="text-gray-500">안전하고 빠른 거래를 위한 꿀팁을 확인하세요.</p>
      </div>

      <div className="space-y-6">
        {tipsList.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
              {item.title}
            </h2>
            
            {item.thumbnail && (
              <div className="mb-6 rounded-xl overflow-hidden border border-gray-100">
                {item.fileType === 'video' ? (
                  <video src={item.thumbnail} controls className="w-full max-h-[400px] bg-black" />
                ) : (
                  <img src={item.thumbnail} alt="tip" className="w-full object-contain max-h-[400px]" />
                )}
              </div>
            )}

            <div className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-xl">
              {item.content}
            </div>
            <p className="text-right text-xs text-gray-400 mt-4">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}