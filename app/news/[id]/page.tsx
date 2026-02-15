"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; // URL에서 글 번호 가져오기
import { db } from '../../../firebase'; // 위치에 따라 ../ 개수 주의 (보통 3개)
import { doc, getDoc } from 'firebase/firestore';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewsDetailPage() {
  const { id } = useParams(); // URL의 [id] 부분 가져오기
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchNews = async () => {
      // 파이어베이스에서 해당 ID의 글 하나만 쏙 가져오기
      const docRef = doc(db, "news", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setNews(docSnap.data());
      }
      setLoading(false);
    };
    fetchNews();
  }, [id]);

  if (loading) return <div className="min-h-screen flex justify-center items-center">로딩중...</div>;
  if (!news) return <div className="min-h-screen flex justify-center items-center">글을 찾을 수 없습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-screen">
      {/* 뒤로가기 버튼 */}
      <Link href="/news" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 font-medium transition">
        <ArrowLeft size={20} className="mr-1" /> 목록으로
      </Link>

      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* 헤더 */}
        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3 mb-4">
             <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
               {news.category || "공지"}
             </span>
             <span className="text-gray-400 text-sm">{news.date}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {news.title}
          </h1>
        </div>

        {/* 본문 내용 */}
        <div className="p-8 text-gray-800 leading-relaxed whitespace-pre-wrap min-h-[300px]">
          {news.content}
        </div>
      </article>
    </div>
  );
}