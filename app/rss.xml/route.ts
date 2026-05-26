import { db } from '../../firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

export async function GET() {
  const baseUrl = 'https://www.메이플급처.com';

  let rssXml = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>메이플급처 - 최신 소식</title>
      <link>${baseUrl}</link>
      <description>메이플스토리 급처템 및 최신 정보를 실시간으로 확인하세요.</description>
      <language>ko</language>`;

  try {
    const tipsQuery = query(collection(db, 'tips'), orderBy('createdAt', 'desc'), limit(5));
    const newsQuery = query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(5));

    const [tipsSnap, newsSnap] = await Promise.all([
      getDocs(tipsQuery),
      getDocs(newsQuery)
    ]);

    tipsSnap.forEach((doc) => {
      const data = doc.data();
      const date = data.createdAt?.seconds
        ? new Date(data.createdAt.seconds * 1000).toUTCString()
        : new Date().toUTCString();
      const url = `${baseUrl}/tip/${doc.id}`;

      rssXml += `
      <item>
        <title><![CDATA[[꿀팁] ${data.title}]]></title>
        <link>${url}</link>
        <description><![CDATA[${data.content?.substring(0, 50)}...]]></description>
        <pubDate>${date}</pubDate>
        <guid>${url}</guid>
      </item>`;
    });

    newsSnap.forEach((doc) => {
      const data = doc.data();
      const date = data.createdAt?.seconds
        ? new Date(data.createdAt.seconds * 1000).toUTCString()
        : new Date().toUTCString();
      const url = `${baseUrl}/news/${doc.id}`;

      rssXml += `
      <item>
        <title><![CDATA[[뉴스] ${data.title}]]></title>
        <link>${url}</link>
        <description><![CDATA[${data.content?.substring(0, 50)}...]]></description>
        <pubDate>${date}</pubDate>
        <guid>${url}</guid>
      </item>`;
    });

  } catch (e) {
    console.error(e);
  }

  rssXml += `
    </channel>
  </rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
