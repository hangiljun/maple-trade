"use client";
import React, { ReactNode } from 'react';

interface CalloutProps {
  type?: 'tip' | 'warning' | 'safe';
  children: ReactNode;
}

/**
 * Callout - 알림 박스 (개선된 디자인)
 */
const Callout: React.FC<CalloutProps> = ({ type = 'tip', children }) => {
  const styles = {
    tip: {
      bg: 'bg-amber-50',
      border: 'border-l-2 border-amber-600',
      text: 'text-amber-900',
      label: '참고',
    },
    warning: {
      bg: 'bg-red-50',
      border: 'border-l-2 border-red-600',
      text: 'text-red-900',
      label: '주의',
    },
    safe: {
      bg: 'bg-emerald-50',
      border: 'border-l-2 border-emerald-600',
      text: 'text-emerald-900',
      label: '안전',
    },
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} ${style.border} pl-4 pr-4 py-3 my-6`}>
      <div className="flex gap-3">
        <span className={`${style.text} text-xs font-bold uppercase tracking-wider flex-shrink-0`}>
          {style.label}
        </span>
        <div className={`${style.text} text-sm leading-relaxed flex-1`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Callout;
