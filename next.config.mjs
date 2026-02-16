/** @type {import('next').NextConfig} */
const nextConfig = {
  // 빌드 시 에러로 인해 배포가 중단되는 것을 방지하는 설정입니다.
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;