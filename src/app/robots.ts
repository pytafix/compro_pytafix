import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/llms.txt'],
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://www.pytafix.web.id/sitemap.xml',
  }
}
