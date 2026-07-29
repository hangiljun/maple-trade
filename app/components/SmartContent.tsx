"use client";
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import SanitizedHTML from './SanitizedHTML';

interface SmartContentProps {
  content: string;
  className?: string;
}

/**
 * HTML과 마크다운을 자동으로 판별하여 적절한 방식으로 렌더링
 * - HTML 태그가 있으면 → SanitizedHTML (XSS 방지)
 * - 마크다운 문법만 있으면 → ReactMarkdown (표/볼드/제목 지원)
 */
const SmartContent: React.FC<SmartContentProps> = ({ content, className }) => {
  // HTML 태그 감지 (간단하고 안전한 방법)
  const isHTML = /<[^>]+>/.test(content);

  if (isHTML) {
    // HTML 렌더링 (에디터로 작성한 글)
    return <SanitizedHTML html={content} className={className} />;
  }

  // 마크다운 렌더링 (AI가 생성한 글, 붙여넣기)
  return (
    <div className={className}>
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

          // 표 (GFM) - HTML 표와 동일한 스타일
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
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default SmartContent;
