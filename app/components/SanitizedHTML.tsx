"use client";
import React from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface SanitizedHTMLProps {
  html: string;
  className?: string;
}

// ✅ DOMPurify 설정 - 표와 스타일 허용
const sanitizeConfig = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',  // 표 태그
    'span', 'div'
  ],
  ALLOWED_ATTR: [
    'href', 'target', 'rel', 'src', 'alt', 'title', 'width', 'height',
    'style', 'class', 'colspan', 'rowspan'  // 표 속성
  ],
  ALLOWED_STYLES: {
    '*': {
      'color': [/^#[0-9a-fA-F]{3,6}$/],
      'background-color': [/^#[0-9a-fA-F]{3,6}$/, /^rgb/],
      'font-size': [/^\d+(?:px|em|rem|%)$/],
      'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
      'border': [/.*/],
      'border-collapse': [/^collapse$/],
      'width': [/.*/],
      'padding': [/.*/],
      'margin': [/.*/]
    }
  }
};

/**
 * 클라이언트 컴포넌트로 HTML sanitize 처리
 * XSS 방지를 위해 DOMPurify로 안전하게 렌더링
 */
const SanitizedHTML: React.FC<SanitizedHTMLProps> = ({ html, className }) => {
  const sanitizedHTML = DOMPurify.sanitize(html, sanitizeConfig);

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
};

export default SanitizedHTML;
