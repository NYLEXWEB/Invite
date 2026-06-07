import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://invitehub.vercel.app'; // Replace with production URL

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/invite/'], // Keep private event details off general search indexes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
