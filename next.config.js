/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/resume.pdf", destination: "/images/Artboard%201.png" },
    ];
  },
};

module.exports = nextConfig;
