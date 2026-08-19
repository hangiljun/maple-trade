"use client";
import React from 'react';

interface ChecklistProps {
  items?: Array<{
    label: string;
    detail?: string;
  }>;
}

// 기본 예시 데이터
const defaultItems = [
  { label: "무기 스타포스 확인", detail: "17성 이상 권장" },
  { label: "잠재능력 등급 확인", detail: "유니크 이상" },
  { label: "추가옵션 확인", detail: "공격력/마력 옵션" },
  { label: "시세 조회", detail: "경매장 실거래가 확인" }
];

/**
 * Checklist - 체크 항목 리스트 (개선된 디자인)
 */
const Checklist: React.FC<ChecklistProps> = ({ items }) => {
  const data = items || defaultItems;

  return (
    <div className="my-8 space-y-3">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-start gap-3 py-3 border-b border-gray-200 last:border-0"
        >
          {/* 체크 아이콘 - 미니멀 */}
          <div className="flex-shrink-0 mt-0.5">
            <svg
              className="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* 텍스트 */}
          <div className="flex-1 min-w-0">
            <p className="text-gray-900 font-medium text-sm leading-snug">
              {item.label}
            </p>
            {item.detail && (
              <p className="text-gray-500 text-xs mt-1">
                {item.detail}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checklist;
