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
 *
 * 3가지 케이스:
 * 1. 진짜 HTML (에디터로 작성) → SanitizedHTML
 * 2. 마크다운을 <p>로 감싼 글 (붙여넣기) → <p> 벗기고 ReactMarkdown
 * 3. 순수 마크다운 → ReactMarkdown
 */
const SmartContent: React.FC<SmartContentProps> = ({ content, className }) => {
  // 의미있는 HTML 태그 (에디터로 제대로 작성한 글)
  const meaningfulTags = /<(strong|em|u|s|table|thead|tbody|tr|th|td|ul|ol|li|h[1-6]|img|a|span|div|blockquote|code|pre)\b[^>]*>/i;

  // 마크다운 문법 감지
  const markdownSyntax = /(\|.*\|)|(\*\*.*\*\*)|(^#{1,6}\s)|(\n#{1,6}\s)|(^[-*+]\s)|(^\d+\.\s)|(^>\s)/m;

  const hasMeaningfulHTML = meaningfulTags.test(content);
  const hasOnlyParagraphTags = /<[^>]+>/.test(content); // HTML 태그가 있는지
  const hasMarkdownSyntax = markdownSyntax.test(content);

  // 🔍 디버깅 (개발 중에만 활성화)
  // console.log('=== SmartContent Debug ===');
  // console.log('Has meaningful HTML:', hasMeaningfulHTML);
  // console.log('Has only paragraph tags:', hasOnlyParagraphTags);
  // console.log('Has markdown syntax:', hasMarkdownSyntax);

  // 케이스 1: 진짜 HTML (의미있는 태그 포함)
  if (hasMeaningfulHTML) {
    // console.log('→ Rendering as real HTML');
    return <SanitizedHTML html={content} className={className} />;
  }

  // 케이스 2: 마크다운을 <p>로 감싼 글
  if (hasOnlyParagraphTags && hasMarkdownSyntax) {
    // console.log('→ Unwrapping <p> tags and rendering as Markdown');
    const unwrappedMarkdown = unwrapParagraphTags(content);
    return renderMarkdown(unwrappedMarkdown, className);
  }

  // 케이스 3: 순수 마크다운 (HTML 태그 없음)
  // console.log('→ Rendering as pure Markdown');
  return renderMarkdown(content, className);
};

/**
 * <p> 태그를 벗기고 순수 마크다운으로 복원
 */
function unwrapParagraphTags(html: string): string {
  let markdown = html;

  // <p><br></p> 또는 <p><br/></p> → 빈 줄
  markdown = markdown.replace(/<p><br\s*\/?><\/p>/gi, '\n');

  // <p>content</p> → content\n
  markdown = markdown.replace(/<p>(.*?)<\/p>/gi, '$1\n');

  // <br> 또는 <br/> → \n
  markdown = markdown.replace(/<br\s*\/?>/gi, '\n');

  // HTML 엔티티 디코드
  markdown = markdown.replace(/&lt;/g, '<');
  markdown = markdown.replace(/&gt;/g, '>');
  markdown = markdown.replace(/&amp;/g, '&');
  markdown = markdown.replace(/&nbsp;/g, ' ');
  markdown = markdown.replace(/&quot;/g, '"');
  markdown = markdown.replace(/&#39;/g, "'");

  // 연속된 빈 줄 정리 (3개 이상 → 2개)
  markdown = markdown.replace(/\n{3,}/g, '\n\n');

  return markdown.trim();
}

/**
 * 마크다운을 ReactMarkdown으로 렌더링
 */
function renderMarkdown(markdown: string, className?: string) {
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
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

export default SmartContent;
