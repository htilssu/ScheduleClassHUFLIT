/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    },
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js', 'mdx'],
  images: {
    domains: ["via.placeholder.com"],
  },
};

export default nextConfig;
