"use client";
import React, { useState, useEffect } from 'react';

/**
 * 현재 날짜를 표시하는 클라이언트 컴포넌트
 * 매번 브라우저에서 최신 날짜를 표시
 */
export default function CurrentDate() {
  const [dateString, setDateString] = useState('');

  useEffect(() => {
    // 클라이언트에서 실행되어 항상 최신 날짜 표시
    const today = new Date();
    setDateString(`${today.getMonth() + 1}월 ${today.getDate()}일`);
  }, []);

  // 초기 로딩 시 깜빡임 방지 (SSR에서는 빈 문자열)
  if (!dateString) {
    return <span>로딩중...</span>;
  }

  return <>{dateString}</>;
}
