import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '메이플급처 - 메이플스토리 급처템 안전거래',
    short_name: '메이플급처',
    description: '메이플스토리 급처템, 아이템 및 메소 최고가 매입·최저가 판매. 전 서버 24시간 안전거래.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
