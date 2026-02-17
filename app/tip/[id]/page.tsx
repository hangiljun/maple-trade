import React from 'react';
import { db } from '@/firebase'; // 👈 firebase 경로가 다르다면 수정 필요 (예: ../../../firebase)
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';

// 페이지 정보 (SEO)
export async function generateMetadata({ params }: { params: { id: string } }) {
  const docRef = doc(db, "tips", params.id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.exists() ? docSnap.data() : null;

  return {
    title: data ? `${data.title} - 메이플급처` : '게시글을 찾을 수 없습니다',
    description: data ? data.content.slice(0, 100) : '내용 없음',
  };
}

export default async function TipDetail({ params }: { params: { id: string } }) {
  // 1. URL에 있는 id로 데이터베이스 조회
  const docRef = doc(db, "tips", params.id);
  const docSnap = await getDoc(docRef);

  // 2. 데이터가 없으면 404 페이지로 보냄
  if (!docSnap.exists()) {
    return notFound();
  }

  const post = { id: docSnap.id, ...docSnap.data() } as any;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* 뒤로가기 버튼 */}
      <Link href="/tip" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
        <ArrowLeft size={18} className="mr-1" /> 목록으로 돌아가기
      </Link>

      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* 헤더 영역 */}
        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded mb-3">
            공지 & 팁
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 gap-4">
            <span className="flex items-center gap-1"><User size={14}/> 관리자</span>
            <span className="flex items-center gap-1"><Calendar size={14}/> {post.date}</span>
          </div>
        </div>

        {/* 본문 영역 */}
        <div className="p-8 min-h-[300px] text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.thumbnail && (
            <img src={post.thumbnail} alt="thumbnail" className="w-full max-w-lg rounded-lg mb-6 border border-gray-100" />
          )}
          {post.content}
        </div>
      </article>
    </div>
  );
}