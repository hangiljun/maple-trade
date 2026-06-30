import React from "react";
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ImageViewer from "../../tip/ImageViewer";
import LinkifyText from '@/app/components/LinkifyText';
import 'react-quill/dist/quill.snow.css';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const docSnap = await getDoc(doc(db, "news", params.id));
  if (!docSnap.exists()) return { title: "게시글을 찾을 수 없습니다" };
  const data = docSnap.data();
  return {
    title: `${data.title} - 메이플급처 이슈`,
    description: data.content?.slice(0, 150) || "메이플스토리 최신 이슈와 공지사항을 확인하세요.",
    keywords: ["메이플 이슈", "메이플스토리 공지", "메이플 업데이트", data.title],
    openGraph: {
      title: `${data.title} - 메이플급처`,
      description: data.content?.slice(0, 150),
      url: `https://www.메이플급처.com/news/${params.id}`,
      type: 'article',
      ...(data.thumbnail && data.fileType !== "video"
        ? { images: [{ url: data.thumbnail, width: 1200, height: 630, alt: data.title }] }
        : {}),
    },
    alternates: {
      canonical: `https://www.메이플급처.com/news/${params.id}`,
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const docSnap = await getDoc(doc(db, "news", params.id));

  if (!docSnap.exists()) notFound();

  const news = docSnap.data()!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": news.title,
    "description": news.content?.slice(0, 200),
    "datePublished": news.createdAt?.seconds
      ? new Date(news.createdAt.seconds * 1000).toISOString()
      : new Date().toISOString(),
    "dateModified": news.createdAt?.seconds
      ? new Date(news.createdAt.seconds * 1000).toISOString()
      : new Date().toISOString(),
    "author": {
      "@type": "Organization",
      "name": "메이플급처"
    },
    "publisher": {
      "@type": "Organization",
      "name": "메이플급처",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.메이플급처.com/og-image.png"
      }
    },
    ...(news.thumbnail && news.fileType !== "video" && {
      "image": news.thumbnail
    })
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
          {/* 블록 기반 렌더링 */}
          {news.blocks && Array.isArray(news.blocks) && news.blocks.length > 0 ? (
            <div className="space-y-6">
              {news.blocks.map((block: any, index: number) => (
                <div key={index}>
                  {block.type === 'text' ? (
                    <div
                      className="ql-editor prose prose-lg max-w-none"
                      style={{
                        color: '#1f2937',
                        fontSize: '18px',
                        lineHeight: '1.75'
                      }}
                      dangerouslySetInnerHTML={{ __html: block.content || '' }}
                    />
                  ) : block.type === 'image' && block.url ? (
                    <div className="my-6">
                      <ImageViewer src={block.url} alt={`이미지 ${index + 1}`} />
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            /* 하위 호환성: 기존 content 필드가 있는 경우 */
            <>
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
            </>
          )}
        </div>
      </article>
      </div>
    </>
  );
}
