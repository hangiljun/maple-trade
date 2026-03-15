import React from 'react';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import type { Metadata } from 'next';
import ImageViewer from '../ImageViewer';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const docSnap = await getDoc(doc(db, "tips", params.id));
  if (!docSnap.exists()) return { title: '게시글을 찾을 수 없습니다' };
  const data = docSnap.data();
  return {
    title: `${data.title} - 메이플급처 이용안내`,
    description: `메이플급처 안전거래 가이드. ${data.content?.slice(0, 120)}`,
    keywords: ["메이플급처 이용안내", "메이플 거래 방법", "메이플 안전거래 팁", data.title],
    openGraph: {
      title: `${data.title} - 메이플급처 이용안내`,
      description: `메이플급처 안전거래 가이드. ${data.content?.slice(0, 120)}`,
      ...(data.thumbnail && data.fileType !== "video"
        ? { images: [{ url: data.thumbnail, width: 1200, height: 630, alt: data.title }] }
        : {}),
    },
  };
}

export default async function TipDetail({ params }: Props) {
  const docSnap = await getDoc(doc(db, "tips", params.id));

  if (!docSnap.exists()) notFound();

  const post = { id: docSnap.id, ...docSnap.data() } as any;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/tip" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
        <ArrowLeft size={18} className="mr-1" /> 목록으로 돌아가기
      </Link>

      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-bold px-2 py-1 rounded mb-3">
            공지 & 팁
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 gap-4">
            <span className="flex items-center gap-1"><User size={14} /> 관리자</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
          </div>
        </div>

        <div className="p-8 min-h-[300px] text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.thumbnail && (
            <div className="mb-6 text-center">
              {post.fileType === 'video' ? (
                <video src={post.thumbnail} controls className="max-w-full max-h-[70vh] mx-auto rounded-xl border border-gray-100" />
              ) : (
                <ImageViewer src={post.thumbnail} alt={`메이플급처 꿀팁 - ${post.title}`} />
              )}
            </div>
          )}
          {post.content}
        </div>
      </article>
    </div>
  );
}