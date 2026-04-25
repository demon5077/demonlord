/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 86400,
    remotePatterns: [
      { hostname: 'media.kitsu.io', port: '', pathname: '/**', protocol: 'https' },
      { hostname: 'media.kitsu.app', port: '', pathname: '/**', protocol: 'https' },
      { protocol: 'https', hostname: 'asianimg.pro' },
      { protocol: 'https', hostname: 'www.pngall.com' },
      { protocol: 'https', hostname: 'gogocdn.net' },
      { protocol: 'https', hostname: 's4.anilist.co' },
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'artworks.thetvdb.com' },
      { protocol: 'https', hostname: 'dramacool.bg' },
      { protocol: 'https', hostname: 'cdn.anilist.co' },
      { protocol: 'https', hostname: '*.mangadex.org' },
      { protocol: 'https', hostname: 'uploads.mangadex.org' },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'demonlord.pp.ua'],
    },
  },
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/tmdb/:path*',
        destination: `https://api.themoviedb.org/3/:path*?api_key=${process.env.TMDB_API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
