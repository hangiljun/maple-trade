import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // ✅ 네이버 로봇한테 아까 만든 지도 위치를 알려줍니다.
    sitemap: 'https://www.메이플급처.com/sitemap.xml',
  }
}