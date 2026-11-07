import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://saif-rohyal.dev';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/whatsapp'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
