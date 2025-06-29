import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ESLint 에러가 빌드를 막지 않도록 설정
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;