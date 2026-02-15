"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import { db } from '../../../firebase'; 
import { doc, getDoc } from 'firebase/firestore';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewsDetailPage() {
  const { id } = useParams(); 
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchNews = async () => {
      const docRef = doc(db, "news", id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setNews(docSnap.data());
      setLoading(false);
    };
    fetchNews();
  }, [id]);

  if (loading) return <div className="min-h-screen flex justify-center items-center">로딩중...</div>;
  if (!news) return <div className="min-h-screen flex justify-center items-center">글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-screen">
      <Link href="/news" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 font-medium transition">
        <ArrowLeft size={20} className="mr-1" /> 목록으로
      </Link>

      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-4">
             <span className="bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold">{news.category || "공지"}</span>
             <span className="text-gray-400 text-sm">{news.date}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{news.title}</h1>
        </div>

        <div className="p-8">
          {news.thumbnail && (
            <div className="mb-8 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              {news.fileType === 'video' ? (
                <video src={news.thumbnail} controls className="w-full max-h-[500px] bg-black" />
              ) : (
                <img src={news.thumbnail} alt="상세 이미지" className="w-full h-auto object-contain max-h-[600px]" />
              )}
            </div>
          )}
          <div className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">{news.content}</div>
        </div>
      </article>
    </div>
  );
}