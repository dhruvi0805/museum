/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Wikimedia blocks or throttles server-side fetches from the image optimizer.
    // Serve remote URLs as plain <img> / unoptimized so the browser loads them directly.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org", pathname: "/**" },
      { protocol: "https", hostname: "en.wikipedia.org", pathname: "/**" },
      { protocol: "https", hostname: "collectionapi.metmuseum.org", pathname: "/**" },
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
      { protocol: "https", hostname: "www.invaluable.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
