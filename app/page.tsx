import Link from "next/link";
import { CheckCircle, Zap, ShieldCheck, TrendingUp, Star } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-20">
      
      {/* 1. 홍보 배너 구역 */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            메이플스토리 급처템 <br/> 가장 안전하고 빠르게 구매하세요
          </h1>
          <p className="text-blue-100 mb-8 text-lg">
            시세보다 저렴한 아이템을 실시간으로 확인하고 거래할 수 있습니다.
          </p>
          
          {/* 네온사인 효과 */}
          <div className="inline-block border-4 border-pink-500 rounded-xl p-4 bg-black/50 backdrop-blur-sm mb-8">
            <p className="neon-text text-xl md:text-2xl font-mono">
              OPEN 365일 24시간 정상 운영중
            </p>
          </div>

          <div className="flex justify-center gap-4 mt-4">
             {/* 여기가 /tip 으로 수정되었습니다 */}
             <Link href="/tip" className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
               거래 방법 보기
             </Link>
             <Link href="/reviews" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition">
               리얼 후기 확인
             </Link>
          </div>
        </div>
      </section>

      {/* 2. 사이트 신념 */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-800">우리의 약속</h2>
          <div className="w-10 h-1 bg-blue-500 mx-auto mt-2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition duration-300">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">무한한 신뢰</h3>
            <p className="text-gray-500">모든 거래는 투명하게 공개되며<br/>검증된 아이템만 취급합니다.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition duration-300">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">압도적 신속</h3>
            <p className="text-gray-500">구매 문의 즉시 응답하며<br/>가장 빠른 거래를 보장합니다.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition duration-300">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">정확한 시세</h3>
            <p className="text-gray-500">데이터 기반의 시세 분석으로<br/>최적의 가격을 제안합니다.</p>
          </div>
        </div>
      </section>

      {/* 3. 특징 및 타 사이트 비교 */}
      <section className="bg-white py-16 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">왜 <span className="text-blue-600">메이플급처템</span>인가요?</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-blue-500 mt-1" />
                  <div>
                    <strong className="block text-lg">수수료 0% 직거래 시스템</strong>
                    <span className="text-gray-500">타 중개 사이트의 과도한 수수료를 없앴습니다.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-blue-500 mt-1" />
                  <div>
                    <strong className="block text-lg">사기 조회 자동 연동</strong>
                    <span className="text-gray-500">더치트 및 메이플 공식 홈페이지 블랙리스트 자동 대조.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-blue-500 mt-1" />
                  <div>
                    <strong className="block text-lg">24시간 전담 매니저 배치</strong>
                    <span className="text-gray-500">새벽 시간대에도 즉시 거래가 가능합니다.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* 비교 테이블 */}
            <div className="flex-1 w-full">
              <div className="border rounded-xl overflow-hidden shadow-lg">
                <table className="w-full text-center">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-4 text-gray-500 font-medium">구분</th>
                      <th className="py-4 text-gray-400 font-medium">타 커뮤니티</th>
                      <th className="py-4 text-blue-600 font-bold bg-blue-50">메이플급처템</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="py-4 text-gray-600">거래 속도</td>
                      <td className="py-4 text-gray-400">평균 3시간</td>
                      <td className="py-4 text-blue-600 font-bold bg-blue-50">평균 5분</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-600">안전성</td>
                      <td className="py-4 text-gray-400">개인 간 책임</td>
                      <td className="py-4 text-blue-600 font-bold bg-blue-50">100% 보증</td>
                    </tr>
                    <tr>
                      <td className="py-4 text-gray-600">시세 정보</td>
                      <td className="py-4 text-gray-400">부정확함</td>
                      <td className="py-4 text-blue-600 font-bold bg-blue-50">실시간 데이터</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 이용후기 연동 (하단 배치) */}
      <section className="max-w-7xl mx-auto px-4 w-full mb-10">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold">최신 거래 후기</h2>
          <Link href="/reviews" className="text-sm text-gray-500 hover:text-blue-600">더보기 &gt;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-5 rounded-lg border hover:shadow-md transition cursor-pointer">
              <div className="flex text-yellow-400 mb-2">
                <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
              </div>
              <p className="text-gray-800 font-medium mb-2 line-clamp-2">생각보다 너무 빨리 팔려서 놀랐습니다. 감사합니다.</p>
              <div className="text-xs text-gray-400 flex justify-between">
                <span>user12***</span>
                <span>2026.02.14</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}