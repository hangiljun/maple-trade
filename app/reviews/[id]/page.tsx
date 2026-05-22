import React from 'react';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star, Calendar, MapPin, Eye } from 'lucide-react';
import type { Metadata } from 'next';
import CommentSection from '../CommentSection';
import LinkifyText from '@/app/components/LinkifyText';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const docSnap = await getDoc(doc(db, "reviews", params.id));
  if (!docSnap.exists()) return { title: '후기를 찾을 수 없습니다' };
  const data = docSnap.data();
  return {
    title: `${data.title} - 메이플급처 이용후기`,
    description: `${data.author}님의 메이플급처 거래 후기. ${data.content?.slice(0, 100)}`,
    openGraph: {
      title: `${data.title} - 메이플급처 이용후기`,
      description: `${data.author}님의 메이플급처 거래 후기. ${data.content?.slice(0, 100)}`,
    },
  };
}

export default async function ReviewDetail({ params }: Props) {
  const docSnap = await getDoc(doc(db, "reviews", params.id));

  if (!docSnap.exists()) notFound();

  const review = { id: docSnap.id, ...docSnap.data() } as any;
  const comments = review.comments || [];

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/reviews" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
        <ArrowLeft size={18} className="mr-1" /> 전체 후기 보기
      </Link>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xl">
                {review.author ? review.author.substring(0, 1) : "U"}
              </div>
              <div>
                <div className="font-bold text-gray-900">{review.author}</div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <MapPin size={10} /> {review.server || "전서버"}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
              <div className="flex text-yellow-400">
                {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
              </div>
              <span className="text-sm font-bold text-yellow-600 ml-1">5.0</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-6 border-b border-gray-100">
            {review.title}
          </h1>

          <div className="text-gray-700 leading-8 min-h-[150px] whitespace-pre-wrap">
            <LinkifyText text={review.content ?? ''} />
          </div>

          <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Eye size={14} /> 조회 {review.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} /> 작성일: {review.date}
            </span>
          </div>
        </div>
      </div>

      {/* 댓글 + 조회수 카운터 (클라이언트) */}
      <CommentSection reviewId={review.id} initialComments={comments} />
    </div>
  );
}