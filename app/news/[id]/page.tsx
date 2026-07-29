import React from "react";
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ImageViewer from "../../tip/ImageViewer";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import 'react-quill/dist/quill.snow.css';

export const dynamic = 'force-dynamic';

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
            /* 하위 호환성: 기존 content 필드가 있는 경우 - 마크다운 렌더링 */
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
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkBreaks]}
                  components={{
                  // 제목
                  h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-3" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-xl font-bold text-gray-900 mt-5 mb-2" {...props} />,

                  // 문단
                  p: ({node, ...props}) => <p className="text-gray-800 text-lg leading-relaxed mb-4" {...props} />,

                  // 강조
                  strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />,
                  em: ({node, ...props}) => <em className="italic text-gray-700" {...props} />,

                  // 링크
                  a: ({node, ...props}) => (
                    <a
                      className="text-blue-600 underline hover:text-blue-800 break-all"
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                    />
                  ),

                  // 리스트
                  ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-800" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-800" {...props} />,
                  li: ({node, ...props}) => <li className="text-lg" {...props} />,

                  // 표 (GFM)
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full border-collapse border border-gray-300" {...props} />
                    </div>
                  ),
                  thead: ({node, ...props}) => <thead className="bg-gray-100" {...props} />,
                  tbody: ({node, ...props}) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
                  tr: ({node, ...props}) => <tr className="hover:bg-gray-50" {...props} />,
                  th: ({node, ...props}) => (
                    <th className="border border-gray-300 px-4 py-2 text-left font-bold text-gray-900" {...props} />
                  ),
                  td: ({node, ...props}) => (
                    <td className="border border-gray-300 px-4 py-2 text-gray-800" {...props} />
                  ),

                  // 코드
                  code: ({node, inline, ...props}: any) =>
                    inline ? (
                      <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                    ) : (
                      <code className="block bg-gray-100 text-gray-800 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4" {...props} />
                    ),

                  // 인용구
                  blockquote: ({node, ...props}) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 text-gray-700 italic bg-blue-50" {...props} />
                  ),

                  // 이미지
                  img: ({node, ...props}) => (
                    <img className="rounded-lg my-4 max-w-full h-auto shadow-sm border border-gray-200" {...props} />
                  ),

                  // 구분선
                  hr: ({node, ...props}) => <hr className="my-6 border-gray-300" {...props} />,
                  }}
                >
                  {news.content ?? ''}
                </ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </article>
      </div>
    </>
  );
}
