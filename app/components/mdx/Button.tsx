"use client";
import React, { ReactNode } from 'react';

interface ButtonProps {
  href: string;
  label?: string;
  children?: ReactNode;
}

/**
 * Button - 외부 링크 버튼 (카카오톡 오픈채팅 등)
 *
 * 사용법:
 * <Button href="..." label="텍스트" />
 * 또는
 * <Button href="...">텍스트</Button>
 */
const Button: React.FC<ButtonProps> = ({ href, label, children }) => {
  const buttonText = children || label;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg my-6"
      style={{ color: '#ffffff' }}
    >
      <span>{buttonText}</span>
      <svg
        className="w-5 h-5 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
};

export default Button;
