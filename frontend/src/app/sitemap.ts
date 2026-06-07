import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://invitehub.vercel.app'; // Replace with production URL

  const staticRoutes = [
    '',
    '/create',
    '/analytics',
    '/seo/wedding-invitation-maker',
    '/seo/birthday-invitation-maker',
    '/seo/housewarming-invitation-maker',
    '/seo/anniversary-invitation-maker',
    '/seo/baby-shower-invitation-maker',
  ];

  return staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/seo') ? 0.8 : 0.5,
  }));
}
