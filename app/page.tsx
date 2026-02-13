"use client";
import React, { useState } from 'react';

export default function MapleQuickDeal() {
  const [activeTab, setActiveTab] = useState('메인');
  const kakaoLink = "https://open.kakao.com/o/sKg86b7f";

  // 메뉴 리스트
  const menus = ['메인', '이용안내', '이용후기', '메이플 이슈', '관리자'];

  return (
    <div className="min-h-screen bg-[#f0f7ff] font-sans text-gray-800">
      {/* 네비게이션 바 */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="text-2xl font-black text-blue-600">메이플급처.com</div>
          <div className="hidden md:flex space-x-8">
            {menus.map((menu) => (
              <button
                key={menu}
                onClick={() => setActiveTab(menu)}
                className={`font-bold ${activeTab === menu ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-blue-400'}`}
              >
                {menu}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 컨텐츠 영역 */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        
        {/* [1] 메인 사이트 */}
        {activeTab === '메인' && (
          <div className="text-center animate-fadeIn">
            <div className="bg-white rounded-3xl p-12 shadow-xl border-4 border-blue-100">
              <h1 className="text-5xl font-black mb-6 leading-tight">
                잠자는 아이템, <span className="text-orange-500">현금</span>으로!<br/>
                업계 <span className="text-blue-600">최고가</span> 매입 보장
              </h1>
              <p className="text-xl text-gray-500 mb-10">메이플스토리 전 서버 급처템 5분 이내 칼입금</p>
              <a href={kakaoLink} target="_blank" className="bg-yellow-400 hover:bg-yellow-500 text-black text-2xl font-black px-12 py-5 rounded-full shadow-[0_5px_0_#ca8a04] transition-all inline-block">
                ⭐ 1:1 카톡 상담하기 ⭐
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-blue-400">
                <h3 className="font-bold text-xl mb-2">⚡ 초고속 입금</h3>
                <p className="text-gray-500 text-sm">아이템 확인 후 5분 내 즉시 송금</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-yellow-400">
                <h3 className="font-bold text-xl mb-2">🛡️ 안전 거래</h3>
                <p className="text-gray-500 text-sm">무사고 거래 내역 5,000건 돌파</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border-b-4 border-green-400">
                <h3 className="font-bold text-xl mb-2">💎 최고가 매입</h3>
                <p className="text-gray-500 text-sm">거품 없는 정직한 시세 측정</p>
              </div>
            </div>
          </div>
        )}

        {/* [2] 이용안내 (게시판 형태) */}
        {activeTab === '이용안내' && (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-3xl font-black mb-6 text-blue-600 border-b pb-4">거래 방법 안내</h2>
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-xl">
                <h4 className="font-bold text-lg mb-2">STEP 1. 상담 신청</h4>
                <p className="text-gray-600">오픈채팅을 통해 판매하실 아이템 스크린샷과 희망 가격을 보내주세요.</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-xl">
                <h4 className="font-bold text-lg mb-2">STEP 2. 시세 확인 및 합의</h4>
                <p className="text-gray-600">전문 상담원이 현재 시세를 바탕으로 매입가를 제안해 드립니다.</p>
              </div>
            </div>
          </div>
        )}

        {/* [3] 이용후기 (유저 나열 형태) */}
        {activeTab === '이용후기' && (
          <div className="space-y-4">
            <h2 className="text-3xl font-black mb-6">실시간 거래 후기</h2>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between mb-2">
                <span className="font-bold text-blue-600">루나***님</span>
                <span className="text-gray-400 text-sm">방금 전</span>
              </div>
              <p className="text-gray-700">진짜 입금 빠르네요 ㅋㅋㅋ 칠흑템 처치 곤란이었는데 감사합니다!</p>
            </div>
          </div>
        )}

        {/* [4] 메이플 이슈 (뉴스 게시판) */}
        {activeTab === '메이플 이슈' && (
          <div className="grid gap-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex">
              <div className="w-32 bg-gray-200 h-32 flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">IMAGE</div>
              <div className="p-6">
                <span className="bg-red-100 text-red-500 text-xs px-2 py-1 rounded mb-2 inline-block font-bold">HOT ISSUE</span>
                <h3 className="text-xl font-bold mb-1">메이플스토리 이번 달 업데이트 미리보기</h3>
                <p className="text-gray-500 text-sm">새로운 이벤트와 밸런스 조정 내용을 확인하세요...</p>
              </div>
            </div>
          </div>
        )}

        {/* [5] 관리자 페이지 (암호 잠금) */}
        {activeTab === '관리자' && (
          <div className="max-w-md mx-auto bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
            <h2 className="text-2xl font-black mb-6 text-center">관리자 로그인</h2>
            <input type="password" placeholder="관리자 암호 입력" className="w-full p-4 border-2 border-blue-100 rounded-xl mb-4 focus:border-blue-400 outline-none" />
            <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700">입장하기</button>
            <p className="text-center text-xs text-gray-400 mt-4">게시글 작성 및 이미지 관리는 로그인이 필요합니다.</p>
          </div>
        )}
      </div>

      <footer className="py-10 text-center text-gray-400 text-sm">
        © 2026 메이플급처.com All Rights Reserved.
      </footer>
    </div>
  );
} 