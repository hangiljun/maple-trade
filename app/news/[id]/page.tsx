import React from "react";
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ImageViewer from "../../tip/ImageViewer";
import LinkifyText from '@/app/components/LinkifyText';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const docSnap = await getDoc(doc(db, "news", params.id));
  if (!docSnap.exists()) return { title: "게시글을 찾을 수 없습니다" };
  const data = docSnap.data();
  return {
    title: data.title,
    description: data.content?.slice(0, 150),
    openGraph: {
      title: data.title,
      description: data.content?.slice(0, 150),
      ...(data.thumbnail && data.fileType !== "video"
        ? { images: [{ url: data.thumbnail, width: 1200, height: 630, alt: data.title }] }
        : {}),
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const docSnap = await getDoc(doc(db, "news", params.id));

  if (!docSnap.exists()) notFound();

  const news = docSnap.data()!;

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
            <div className="mb-8">
              {news.fileType === 'video' ? (
                <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                  <video src={news.thumbnail} controls className="w-full max-h-[500px] bg-black" />
                </div>
              ) : (
                <ImageViewer src={news.thumbnail} alt={news.title || "상세 이미지"} />
              )}
            </div>
          )}
          <div className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
            <LinkifyText text={news.content ?? ''} />
          </div>
        </div>
      </article>
    </div>
  );
}
