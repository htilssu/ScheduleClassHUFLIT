/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    authInterrupts: true,
    ppr: true,
    dynamicIO: true,
    useCache: true,
    turbo: {
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
    },
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  pageExtensions: ["tsx", "ts", "jsx", "js", "mdx"],
  images: {
    remotePatterns: [
      {
        hostname: "via.placeholder.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
  /**
   * Cấu hình để hỗ trợ CSS từ swagger-ui-react
   */
  transpilePackages: ["swagger-ui-react"],
};

export default nextConfig;
