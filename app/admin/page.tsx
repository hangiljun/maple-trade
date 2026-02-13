"use client";

import React, { useState } from "react";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<string>("news");

  return (
    <div className="flex min-h-screen bg-gray-50 -mt-10 -mx-4">
      {/* 관리자 사이드바 */}
      <aside className="w-64 bg-white border-r border-gray-100 p-6">
        <h2 className="text-xl font-black text-orange-500 mb-10">관리자 센터</h2>
        <nav className="space-y-2">
          {(['news', 'reviews', 'images'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold transition ${
                activeTab === tab ? "bg-orange-500 text-white" : "text-gray-400 hover:bg-gray-100"
              }`}
            >
              {tab === 'news' && "메이플 이슈 관리"}
              {tab === 'reviews' && "이용후기 관리"}
              {tab === 'images' && "배너/사진 관리"}
            </button>
          ))}
        </nav>
      </aside>

      {/* 관리 콘텐츠 영역 */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-bold text-gray-800">
            {activeTab === 'news' && "메이플 이슈 작성"}
            {activeTab === 'reviews' && "이용후기 승인/삭제"}
            {activeTab === 'images' && "메인 배너 이미지 등록"}
          </h3>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm">로그아웃</button>
        </header>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">제목</label>
              <input type="text" className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 text-gray-900" placeholder="제목을 입력하세요" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">내용</label>
              <textarea rows={6} className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 text-gray-900" placeholder="내용을 입력하세요"></textarea>
            </div>
            {activeTab === 'images' && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">사진 업로드</label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center text-gray-400 cursor-pointer hover:bg-gray-50 transition">
                  클릭하여 사진 선택 (jpg, png)
                </div>
              </div>
            )}
            <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 transition mt-6">
              등록하기
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}