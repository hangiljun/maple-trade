"use client";
import React, { useState } from 'react';

export default function MapleQuickDeal() {
  const [activeTab, setActiveTab] = useState('메인');
  const kakaoLink = "https://open.kakao.com/o/sKg86b7f";

  const menus = ['메인', '이용안내', '이용후기', '메이플 이슈', '관리자'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f7ff', fontFamily: 'sans-serif', color: '#333' }}>
      <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50, padding: '0 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#2563eb' }}>메이플급처.com</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            {menus.map((menu) => (
              <button key={menu} onClick={() => setActiveTab(menu)} style={{ background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', color: activeTab === menu ? '#2563eb' : '#666', borderBottom: activeTab === menu ? '2px solid #2563eb' : 'none', padding: '10px 0' }}>
                {menu}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
        {activeTab === '메인' && (
          <div style={{ backgroundColor: '#fff', borderRadius: '30px', padding: '60px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '4px solid #e0f2fe' }}>
            <h1 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '20px', lineHeight: '1.2' }}>
              잠자는 아이템, <span style={{ color: '#f97316' }}>현금</span>으로!<br/>
              업계 <span style={{ color: '#2563eb' }}>최고가</span> 매입 보장
            </h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>메이플스토리 전 서버 급처템 5분 이내 칼입금</p>
            <a href={kakaoLink} target="_blank" style={{ display: 'inline-block', backgroundColor: '#facc15', color: '#000', fontSize: '20px', fontWeight: '900', padding: '20px 40px', borderRadius: '50px', textDecoration: 'none', boxShadow: '0 5px 0 #ca8a04' }}>
              ⭐ 1:1 카톡 상담하기 ⭐
            </a>
          </div>
        )}
        {/* 다른 탭은 사이트가 정상화된 후 추가해 드릴게요! */}
      </div>
    </div>
  );
}