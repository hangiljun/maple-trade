import React from 'react';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import type { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import CompareBar from '@/app/components/mdx/CompareBar';
import Callout from '@/app/components/mdx/Callout';
import Checklist from '@/app/components/mdx/Checklist';

type Props = { params: { id: string } };

// MDX 컴포넌트 정의
const components = {
  // 커스텀 컴포넌트
  CompareBar,
  Callout,
  Checklist,

  // 제목
  h1: (props: any) => <h1 className="text-3xl text-gray-900 mt-8 mb-4" style={{ fontWeight: 600 }} {...props} />,
  h2: (props: any) => <h2 className="text-2xl text-gray-900 mt-6 mb-3" style={{ fontWeight: 600 }} {...props} />,
  h3: (props: any) => <h3 className="text-xl text-gray-900 mt-5 mb-2" style={{ fontWeight: 600 }} {...props} />,

  // 문단
  p: (props: any) => <p className="text-gray-800 text-lg leading-relaxed mb-4" {...props} />,

  // 강조
  strong: (props: any) => <strong className="font-bold text-gray-900" {...props} />,
  em: (props: any) => <em className="italic text-gray-700" {...props} />,

  // 링크
  a: (props: any) => (
    <a
      className="text-blue-600 underline hover:text-blue-800 break-all"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),

  // 리스트
  ul: (props: any) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-800" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-800" {...props} />,
  li: (props: any) => <li className="text-lg" {...props} />,

  // 표 - 브랜드 스타일
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse" {...props} />
    </div>
  ),
  thead: (props: any) => <thead className="bg-blue-50 border-b-2 border-blue-600" {...props} />,
  tbody: (props: any) => <tbody className="bg-white" {...props} />,
  tr: (props: any) => <tr className="even:bg-gray-50 hover:bg-blue-50" {...props} />,
  th: (props: any) => (
    <th className="border-none border-b-2 border-blue-600 px-4 py-2 text-left text-blue-800 text-sm uppercase tracking-wide" style={{ fontWeight: 600 }} {...props} />
  ),
  td: (props: any) => (
    <td className="border-none border-b border-gray-200 px-4 py-2 text-gray-800" {...props} />
  ),

  // 코드 블록
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6 border border-gray-700" {...props} />
  ),
  code: (props: any) => {
    const { inline, className, ...rest } = props;
    return inline ? (
      <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono" {...rest} />
    ) : (
      <code className="font-mono text-sm" {...rest} />
    );
  },

  // 인용구
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 text-gray-700 italic bg-blue-50" {...props} />
  ),

  // 이미지
  img: (props: any) => (
    <img className="rounded-lg my-4 max-w-full h-auto shadow-sm border border-gray-200" {...props} />
  ),

  // 구분선
  hr: (props: any) => <hr className="my-6 border-gray-300" {...props} />,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const docSnap = await getDoc(doc(db, "tips", params.id));
  if (!docSnap.exists()) return { title: '게시글을 찾을 수 없습니다' };
  const data = docSnap.data();

  const canonicalUrl = `/tip/${params.id}`;
  const fullUrl = `https://www.메이플급처.com${canonicalUrl}`;

  return {
    title: `${data.title} - 메이플급처 이용안내`,
    description: `메이플급처 안전거래 가이드 - ${data.title}`,

    // Canonical URL (중복 콘텐츠 방지)
    alternates: {
      canonical: canonicalUrl,
    },

    // Open Graph (SNS 공유)
    openGraph: {
      title: `${data.title} - 메이플급처`,
      description: `메이플급처 안전거래 가이드 - ${data.title}`,
      url: fullUrl,
      siteName: '메이플급처',
      locale: 'ko_KR',
      type: 'article',
      publishedTime: data.date || new Date().toISOString(),
    },

    // Twitter Card
    twitter: {
      card: 'summary',
      title: `${data.title} - 메이플급처`,
      description: `메이플급처 안전거래 가이드 - ${data.title}`,
    },
  };
}

export default async function TipDetail({ params }: Props) {
  const docSnap = await getDoc(doc(db, "tips", params.id));

  if (!docSnap.exists()) notFound();

  const post = { id: docSnap.id, ...docSnap.data() } as any;

  // blocks 배열을 MDX 문자열로 변환
  let mdxContent = '';

  if (post.blocks && Array.isArray(post.blocks)) {
    // blocks 배열에서 텍스트 블록만 추출하여 합침
    mdxContent = post.blocks
      .filter((block: any) => block.type === 'text' && block.content)
      .map((block: any) => block.content)
      .join('\n\n');
  }

  // blocks가 없으면 mdxContent 또는 content 필드 사용 (하위 호환)
  if (!mdxContent) {
    mdxContent = post.mdxContent || post.content || '';
  }

  // MDX 내용이 없으면 기본 메시지
  if (!mdxContent) {
    mdxContent = `
# ${post.title}

콘텐츠가 없습니다.
`;
  }

  // 서버에서 MDX 컴파일 (SSR)
  const { content } = await compileMDX({
    source: mdxContent,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkBreaks],
        rehypePlugins: [],
        development: false,
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/tip" className="inline-flex items-center text-gray-500 hover:text-blue-600 mb-6 transition">
        <ArrowLeft size={18} className="mr-1" /> 목록으로 돌아가기
      </Link>

      <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-gray-50/50">
          <span className="inline-block bg-purple-100 text-purple-600 text-xs font-bold px-2 py-1 rounded mb-3">
            {post.category || '이용안내'}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 gap-4">
            <span className="flex items-center gap-1"><User size={14} /> 관리자</span>
            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
          </div>
        </div>

        <div className="p-8 min-h-[300px] news-content prose prose-lg max-w-none">
          {content}
        </div>
      </article>
    </div>
  );
}
