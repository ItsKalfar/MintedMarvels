/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minted-marvels.infura-ipfs.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
