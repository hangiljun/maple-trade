import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";

const KAKAO_LINK = "https://open.kakao.com/o/sKg86b7f";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <p className="text-9xl font-black text-blue-100 select-none">404</p>
      <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-2">페이지를 찾을 수 없습니다</h1>
      <p className="text-gray-500 mb-8">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          href="/"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-blue-700 transition"
        >
          <Home size={16} /> 메인으로
        </Link>
        <a
          href={KAKAO_LINK}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-[#FEE500] text-[#3A1D1D] px-5 py-2.5 rounded-full font-bold hover:bg-yellow-400 transition"
        >
          <MessageCircle size={16} fill="#3A1D1D" /> 카톡 문의
        </a>
      </div>
    </div>
  );
}
