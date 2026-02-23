import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lab.badrigaire.com.np';
  
  const routes = [
    '',
    '/rendering/ssr',
    '/rendering/ssg',
    '/rendering/isr',
    '/rendering/csr',
    '/rendering/rsc',
    '/rendering/ppr',
    '/browser-pipeline',
    '/code-splitting',
    '/caching-strategies',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
