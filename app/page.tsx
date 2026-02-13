"use client";
import React, { useState, useEffect } from 'react';

// 후기 데이터 타입 정의
type Review = {
  id: number;
  server: string;
  name: string;
  content: string;
  date: string;
};

export default function MapleItemSite() {
  const [activeTab, setActiveTab] = useState('메인');
  const kakaoLink = "https://open.kakao.com/o/sKg86b7f";
  
  // 초기 후기 데이터 (예시)
  const [reviews, setReviews] = useState<Review[]>([
    { id: 1, server: '스카니아', name: '김**', content: '쿨거래 감사합니다. 바로 정산해주시네요!', date: '2026-02-14' },
    { id: 2, server: '루나', name: '이**', content: '챌린저스 서버도 매입해주셔서 좋았어요.', date: '2026-02-14' },
  ]);

  // 후기 작성 입력값 상태
  const [newReview, setNewReview] = useState({ server: '스카니아', name: '', content: '' });

  // 메뉴 리스트 (관리자는 숨김)
  const menus = [
    { name: '메인', id: 'main' },
    { name: '이용안내', id: 'guide' },
    { name: '이용후기', id: 'reviews' },
    { name: '메이플 이슈', id: 'news' },
  ];

  // 주소(해시) 변경 감지 및 탭 전환 기능
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') {
        setActiveTab('관리자');
      } else if (hash) {
        // 해당 id를 가진 메뉴명을 찾아서 설정
        const menu = menus.find(m => m.id === hash);
        if (menu) setActiveTab(menu.name);
      } else {
        setActiveTab('메인');
      }
    };

    // 처음 접속 시 및 해시 변경 시 실행
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 탭 변경 시 주소창 업데이트 함수
  const changeTab = (menuName: string, menuId: string) => {
    setActiveTab(menuName);
    window.location.hash = menuId;
  };

  // 후기 등록 함수
  const handleReviewSubmit = () => {
    if (!newReview.name || !newReview.content) {
      alert("이름과 내용을 입력해주세요!");
      return;
    }
    const review: Review = {
      id: Date.now(),
      server: newReview.server,
      name: newReview.name,
      content: newReview.content,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([review, ...reviews]); // 새 후기를 맨 위에 추가
    setNewReview({ server: '스카니아', name: '', content: '' }); // 입력창 초기화
    alert("후기가 등록되었습니다!");
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'sans-serif', color: '#333' }}>
      
      {/* 네비게이션 바 */}
      <nav style={{ backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px', padding: '0 20px' }}>
          {/* 1. 사이트 이름 수정 */}
          <div 
            onClick={() => changeTab('메인', 'main')} 
            style={{ fontSize: '26px', fontWeight: '900', color: '#2563eb', cursor: 'pointer', letterSpacing: '-1px' }}
          >
            메이플 아이템
          </div>
          
          <div style={{ display: 'flex', gap: '30px' }}>
            {menus.map((menu) => (
              <button 
                key={menu.name} 
                onClick={() => changeTab(menu.name, menu.id)} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  fontSize: '17px',
                  fontWeight: 'bold', 
                  cursor: 'pointer', 
                  color: activeTab === menu.name ? '#2563eb' : '#555', 
                  padding: '10px 0',
                  position: 'relative'
                }}
              >
                {menu.name}
                {activeTab === menu.name && (
                  <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: '3px', backgroundColor: '#2563eb', borderRadius: '2px' }} />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 컨텐츠 영역 */}
      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* [메인 화면] */}
        {activeTab === '메인' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ backgroundColor: '#fff', borderRadius: '30px', padding: '80px 20px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', marginBottom: '50px', border: '1px solid #edf2f7' }}>
              
              {/* 2. 메인 문구 및 서브 문구 수정 */}
              <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px', lineHeight: '1.3', color: '#1a202c' }}>
                잠자는 아이템, <span style={{ color: '#2563eb' }}>빠른 처분</span><br/>
                업계 최고가 <span style={{ color: '#f59e0b' }}>85~90%</span> 구매 보장
              </h1>
              
              <p style={{ fontSize: '18px', color: '#4a5568', marginBottom: '50px', fontWeight: '500' }}>
                챌린저스, 일반월드, 에오스, 헬리오스 모든 급처템 구매합니다.
              </p>
              
              <a href={kakaoLink} target="_blank" style={{ display: 'inline-block', backgroundColor: '#facc15', color: '#000', fontSize: '24px', fontWeight: '900', padding: '25px 60px', borderRadius: '60px', textDecoration: 'none', boxShadow: '0 10px 20px rgba(250, 204, 21, 0.4)', transition: 'transform 0.2s' }}>
                ⚡ 카톡으로 시세 확인하기 ⚡
              </a>
            </div>

            {/* 특징 카드 3개 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
              <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderTop: '6px solid #3b82f6' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚀</div>
                {/* 4. 입금 -> 거래/정산 단어 수정 */}
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>초고속 거래</h3>
                <p style={{ color: '#718096', lineHeight: '1.6' }}>아이템 확인 후 지체 없이<br/>즉시 정산해 드립니다.</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderTop: '6px solid #f59e0b' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚖️</div>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>아이템 시세 확인</h3>
                <p style={{ color: '#718096', lineHeight: '1.6' }}>빠른 거래를 위해 실시간 시세를<br/>투명하게 안내해 드립니다.</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderTop: '6px solid #10b981' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🛡️</div>
                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' }}>안전한 매입</h3>
                <p style={{ color: '#718096', lineHeight: '1.6' }}>수천 건의 거래 내역이 증명하는<br/>신뢰도 1위 사이트입니다.</p>
              </div>
            </div>
          </div>
        )}

        {/* [이용안내] */}
        {activeTab === '이용안내' && (
          <div style={{ backgroundColor: '#fff', padding: '60px', borderRadius: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '40px', color: '#2d3748' }}>쉽고 빠른 거래 방법</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '30px', backgroundColor: '#f7fafc', borderRadius: '20px' }}>
                 <div style={{ backgroundColor: '#3b82f6', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
                 <div>
                   <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>카카오톡 문의</h4>
                   <p style={{ color: '#4a5568' }}>판매하실 아이템의 사진과 희망 가격을 보내주세요.</p>
                 </div>
               </div>
               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '30px', backgroundColor: '#f7fafc', borderRadius: '20px' }}>
                 <div style={{ backgroundColor: '#3b82f6', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
                 <div>
                   <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>시세 확인 및 조율</h4>
                   <p style={{ color: '#4a5568' }}>전문 상담원이 현재 시세를 확인하여 최고가 매입액을 제시합니다.</p>
                 </div>
               </div>
               <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', padding: '30px', backgroundColor: '#f7fafc', borderRadius: '20px' }}>
                 <div style={{ backgroundColor: '#3b82f6', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</div>
                 <div>
                   <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>거래 완료</h4>
                   <p style={{ color: '#4a5568' }}>인게임 교환 후 즉시 계좌로 정산됩니다. (5분 이내)</p>
                 </div>
               </div>
            </div>
          </div>
        )}

        {/* [이용후기] */}
        {activeTab === '이용후기' && (
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px', color: '#2d3748' }}>실시간 거래 후기</h2>
            
            {/* 5. 후기 작성 폼 추가 */}
            <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', marginBottom: '40px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', border: '2px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>🖊️ 후기 작성하기</h3>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <select 
                  value={newReview.server}
                  onChange={(e) => setNewReview({...newReview, server: e.target.value})}
                  style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e0', outline: 'none' }}
                >
                  <option value="스카니아">스카니아</option>
                  <option value="루나">루나</option>
                  <option value="엘리시움">엘리시움</option>
                  <option value="크로아">크로아</option>
                  <option value="베라">베라</option>
                  <option value="오로라">오로라</option>
                  <option value="리부트">리부트</option>
                  <option value="챌린저스">챌린저스</option>
                </select>
                <input 
                  type="text" 
                  placeholder="이름 (두 글자)" 
                  maxLength={5}
                  value={newReview.name}
                  onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                  style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e0', outline: 'none', width: '120px' }} 
                />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  placeholder="후기 내용을 입력해주세요 (예: 빠르고 친절해요!)" 
                  value={newReview.content}
                  onChange={(e) => setNewReview({...newReview, content: e.target.value})}
                  style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e0', outline: 'none' }} 
                />
                <button 
                  onClick={handleReviewSubmit}
                  style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
                >
                  등록
                </button>
              </div>
            </div>

            {/* 후기 리스트 */}
            <div style={{ display: 'grid', gap: '15px' }}>
              {reviews.map((review) => (
                <div key={review.id} style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ backgroundColor: '#ebf8ff', color: '#2b6cb0', padding: '4px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold' }}>{review.server}</span>
                      <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{review.name}님</span>
                    </div>
                    <span style={{ color: '#a0aec0', fontSize: '14px' }}>{review.date}</span>
                  </div>
                  <p style={{ color: '#4a5568', fontSize: '16px' }}>{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* [메이플 이슈 - 준비중] */}
        {activeTab === '메이플 이슈' && (
          <div style={{ textAlign: 'center', padding: '120px 0' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>📰</div>
            <h2 style={{ fontSize: '28px', color: '#718096', fontWeight: 'bold' }}>최신 소식을 준비 중입니다.</h2>
            <p style={{ color: '#a0aec0', marginTop: '10px' }}>조금만 기다려주세요!</p>
          </div>
        )}

        {/* 6. [관리자 페이지] - 메뉴엔 안 보이고 #admin으로만 접근 가능 */}
        {activeTab === '관리자' && (
           <div style={{ maxWidth: '400px', margin: '80px auto', backgroundColor: '#fff', padding: '50px', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center', color: '#2d3748' }}>관리자 접속</h2>
            <input type="password" placeholder="비밀번호" style={{ width: '100%', padding: '16px', marginBottom: '16px', borderRadius: '12px', border: '1px solid #cbd5e0', fontSize: '16px', outline: 'none' }} />
            <button style={{ width: '100%', padding: '16px', backgroundColor: '#1a202c', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', transition: 'background 0.2s' }}>로그인</button>
            <p style={{ textAlign: 'center', marginTop: '20px', color: '#a0aec0', fontSize: '13px' }}>관계자 외 접속 금지</p>
           </div>
        )}

      </div>

      {/* 푸터 */}
      <footer style={{ textAlign: 'center', padding: '60px 20px', color: '#a0aec0', fontSize: '14px', marginTop: '80px', borderTop: '1px solid #e2e8f0' }}>
        <p style={{ marginBottom: '10px' }}>메이플 아이템 | 대표: 한길준</p>
        <p>© 2026 MapleItem. All Rights Reserved.</p>
      </footer>
    </div>
  );
}