"use client";
import React from 'react';

interface CompareBarProps {
  items?: Array<{
    label: string;
    value: number;
  }>;
}

// 기본 예시 데이터
const defaultItems = [
  { label: "경매장 판매", value: 4 },
  { label: "사이트 직접 판매", value: 3 }
];

/**
 * CompareBar - 비교 막대 그래프 (개선된 디자인)
 *
 * 디자인 원칙:
 * - 첫 번째 옵션: 중립 gray-400 (기존/불리한 옵션)
 * - 두 번째 옵션: 브랜드 blue-600 + 뱃지 (강조하고 싶은 옵션)
 * - 라벨: "N/M단계" 분수 표기
 */
const CompareBar: React.FC<CompareBarProps> = ({ items }) => {
  const data = items || defaultItems;
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <div className="my-10 space-y-6">
      {data.map((item, index) => {
        const percentage = (item.value / maxValue) * 100;
        const isHighlighted = index === 1; // 두 번째 옵션 강조
        const barColor = isHighlighted ? 'bg-blue-600' : 'bg-gray-400';

        return (
          <div key={index} className="space-y-3">
            {/* 라벨 + 값 */}
            <div className="flex justify-between items-baseline">
              <span className="text-base font-semibold text-gray-900" style={{ fontWeight: 600 }}>
                {item.label}
              </span>
              <span className="text-sm font-mono font-medium text-gray-600">
                {item.value}/{maxValue}단계
              </span>
            </div>

            {/* 막대 */}
            <div className="relative h-3 bg-gray-100 rounded-sm overflow-visible">
              <div
                className={`absolute inset-y-0 left-0 ${barColor} rounded-sm transition-all duration-1000 ease-out`}
                style={{ width: `${percentage}%` }}
              />

              {/* 시그니처 뱃지 - 강조 옵션에만 */}
              {isHighlighted && (
                <div
                  className="absolute -top-1 flex items-center transition-all duration-1000 ease-out"
                  style={{ left: `${percentage}%`, transform: 'translateX(-100%)' }}
                >
                  <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow-sm whitespace-nowrap flex items-center gap-1">
                    <span>더 빠름</span>
                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompareBar;
