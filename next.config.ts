import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.skillsclub.com",
        port: "",
        pathname: "/participants/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/apollographql/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/skillsclub/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "www.nimbus-tech.de",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d1.awsstatic.com",
        port: "",
        pathname: "/certification/badges/**",
      },
    ],
  },
  reactStrictMode: true,
}

export default nextConfig
