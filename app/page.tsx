"use client";
import React, { useState } from 'react';

export default function MapleQuickDeal() {
  const [activeTab, setActiveTab] = useState('메인');
  const kakaoLink = "https://open.kakao.com/o/sKg86b7f";

  // 메뉴 리스트
  const menus = ['메인', '이용안내', '이용후기', '메이플 이슈', '관리자'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f7ff', fontFamily: 'sans-serif', color: '#333' }}>
      {/* 네비게이션 바 */}
      <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50, padding: '0 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#2563eb' }}>메이플급처.com</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            {menus.map((menu) => (
              <button 
                key={menu} 
                onClick={() => setActiveTab(menu)} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '16px',
                  fontWeight: 'bold', 
                  cursor: 'pointer', 
                  color: activeTab === menu ? '#2563eb' : '#666', 
                  borderBottom: activeTab === menu ? '3px solid #2563eb' : '3px solid transparent', 
                  padding: '18px 0',
                  transition: 'all 0.2s'
                }}
              >
                {menu}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 컨텐츠 영역 */}
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* [1] 메인 화면 */}
        {activeTab === '메인' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '30px', padding: '60px 20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '4px solid #e0f2fe', marginBottom: '40px' }}>
              <h1 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '20px', lineHeight: '1.3' }}>
                잠자는 아이템, <span style={{ color: '#f97316' }}>현금</span>으로!<br/>
                업계 <span style={{ color: '#2563eb' }}>최고가</span> 매입 보장
              </h1>
              <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>메이플스토리 전 서버 급처템 5분 이내 칼입금</p>
              <a href={kakaoLink} target="_blank" style={{ display: 'inline-block', backgroundColor: '#facc15', color: '#000', fontSize: '22px', fontWeight: '900', padding: '20px 50px', borderRadius: '50px', textDecoration: 'none', boxShadow: '0 6px 0 #ca8a04', transition: 'transform 0.1s' }}>
                ⭐ 1:1 카톡 상담하기 ⭐
              </a>
            </div>

            {/* 특징 카드 3개 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', borderBottom: '5px solid #60a5fa' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>⚡</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>초고속 입금</h3>
                <p style={{ color: '#666' }}>아이템 확인 후 5분 내 즉시 송금</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', borderBottom: '5px solid #facc15' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>🛡️</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>안전 거래</h3>
                <p style={{ color: '#666' }}>수천 건의 후기가 증명하는 신뢰도</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', borderBottom: '5px solid #4ade80' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>💰</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>정직한 시세</h3>
                <p style={{ color: '#666' }}>거품 없는 투명한 매입가 제시</p>
              </div>
            </div>
          </div>
        )}

        {/* [2] 이용안내 */}
        {activeTab === '이용안내' && (
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>거래 이용 안내</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
               <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '15px' }}>
                 <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0369a1', marginBottom: '5px' }}>STEP 1. 카톡 문의</h4>
                 <p>판매하실 아이템의 스크린샷과 희망 가격을 카카오톡으로 보내주세요.</p>
               </div>
               <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '15px' }}>
                 <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0369a1', marginBottom: '5px' }}>STEP 2. 가격 협의</h4>
                 <p>전문 상담원이 실시간 시세를 확인하여 최고가 매입 금액을 안내해 드립니다.</p>
               </div>
               <div style={{ backgroundColor: '#f0f9ff', padding: '20px', borderRadius: '15px' }}>
                 <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0369a1', marginBottom: '5px' }}>STEP 3. 거래 및 입금</h4>
                 <p>인게임에서 아이템 전달 후 5분 이내에 계좌로 입금됩니다.</p>
               </div>
            </div>
          </div>
        )}

        {/* [3] 이용후기 (예시) */}
        {activeTab === '이용후기' && (
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>실시간 거래 후기</h2>
            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', marginBottom: '15px', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold', color: '#2563eb' }}>스카니아***님</span>
                <span style={{ color: '#999', fontSize: '14px' }}>방금 전</span>
              </div>
              <p>급하게 처분해야 했는데 쿨거래 감사합니다! 사장님 친절하시네요.</p>
            </div>
             <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '15px', marginBottom: '15px', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold', color: '#2563eb' }}>루나***님</span>
                <span style={{ color: '#999', fontSize: '14px' }}>10분 전</span>
              </div>
              <p>입금 진짜 빠르네요 ㄷㄷ 다음에 또 이용할게요.</p>
            </div>
          </div>
        )}

        {/* [4] 메이플 이슈 (준비중 화면) */}
        {activeTab === '메이플 이슈' && (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2 style={{ fontSize: '24px', color: '#999' }}>📢 최신 메이플 뉴스를 준비 중입니다!</h2>
          </div>
        )}

        {/* [5] 관리자 페이지 (준비중) */}
        {activeTab === '관리자' && (
           <div style={{ maxWidth: '400px', margin: '50px auto', backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>관리자 로그인</h2>
            <input type="password" placeholder="비밀번호 입력" style={{ width: '100%', padding: '15px', marginBottom: '15px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px' }} />
            <button style={{ width: '100%', padding: '15px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>로그인</button>
           </div>
        )}

      </div>

      {/* 푸터 */}
      <footer style={{ textAlign: 'center', padding: '40px', color: '#999', fontSize: '14px', marginTop: '50px' }}>
        © 2026 메이플급처.com All Rights Reserved.
      </footer>
    </div>
  );
}