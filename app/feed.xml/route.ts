import { NextResponse } from 'next/server';
import { db } from '@/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const BASE_URL = 'https://www.메이플급처.com';

export const revalidate = 3600; // 1시간마다 재생성

export async function GET() {
  try {
    // 최신 뉴스, 팁, 후기 가져오기
    const [newsSnap, tipsSnap, reviewsSnap] = await Promise.all([
      getDocs(query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(20))),
      getDocs(query(collection(db, 'tips'), orderBy('createdAt', 'desc'), limit(20))),
      getDocs(query(collection(db, 'reviews'), orderBy('createdAt', 'desc'), limit(20))),
    ]);

    const items: Array<{
      title: string;
      link: string;
      description: string;
      pubDate: string;
      category?: string;
    }> = [];

    // 뉴스 항목
    newsSnap.docs.forEach((doc) => {
      const data = doc.data();
      items.push({
        title: data.title || '메이플 이슈',
        link: `${BASE_URL}/news/${doc.id}`,
        description: data.content?.substring(0, 200) || '메이플스토리 최신 소식',
        pubDate: data.createdAt?.seconds
          ? new Date(data.createdAt.seconds * 1000).toUTCString()
          : new Date().toUTCString(),
        category: '메이플 이슈',
      });
    });

    // 팁 항목
    tipsSnap.docs.forEach((doc) => {
      const data = doc.data();
      items.push({
        title: data.title || '이용안내',
        link: `${BASE_URL}/tip/${doc.id}`,
        description: data.content?.substring(0, 200) || '메이플급처 이용안내',
        pubDate: data.createdAt?.seconds
          ? new Date(data.createdAt.seconds * 1000).toUTCString()
          : new Date().toUTCString(),
        category: '이용안내',
      });
    });

    // 후기 항목
    reviewsSnap.docs.forEach((doc) => {
      const data = doc.data();
      items.push({
        title: data.title || '거래 후기',
        link: `${BASE_URL}/reviews/${doc.id}`,
        description: data.content?.substring(0, 200) || '메이플급처 이용후기',
        pubDate: data.createdAt?.seconds
          ? new Date(data.createdAt.seconds * 1000).toUTCString()
          : new Date().toUTCString(),
        category: '이용후기',
      });
    });

    // 날짜순 정렬
    items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>메이플급처 - 메이플스토리 급처템 안전거래</title>
    <link>${BASE_URL}</link>
    <description>메이플스토리 급처템, 아이템 및 메소 최고가 매입·최저가 판매. 스카니아, 루나, 엘리시움 등 전 서버 24시간 안전거래.</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items
      .map(
        (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${item.pubDate}</pubDate>
      ${item.category ? `<category>${item.category}</category>` : ''}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

    return new NextResponse(rssFeed, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('RSS feed generation error:', error);

    // 에러 시 기본 RSS 반환
    const fallbackRSS = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>메이플급처 - 메이플스토리 급처템 안전거래</title>
    <link>${BASE_URL}</link>
    <description>메이플스토리 급처템 전문 안전거래</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`;

    return new NextResponse(fallbackRSS, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}
