import Link from "next/link";
import { db } from "../../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "메이플 이슈 & 뉴스",
  description: "메이플스토리 최신 업데이트 및 공지사항",
};

export default async function NewsPage() {
  let newsList: any[] = [];

  try {
    const q = query(collection(db, "news"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    newsList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("뉴스 로딩 실패:", error);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">📢 메이플 이슈</h1>

      {newsList.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          등록된 게시글이 없습니다.
        </div>
      ) : (
        <ul className="divide-y divide-gray-100 bg-white rounded-xl shadow">
          {newsList.map((item: any) => (
            <li key={item.id} className="hover:bg-gray-50 transition">
              <Link
                href={`/news/${item.id}`}
                className="block px-4 py-4"
              >
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-sm text-gray-400">{item.date}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
