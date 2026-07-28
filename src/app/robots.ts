import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'],
        allow: ['/', '/llms.txt'],
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: '*',
        allow: ['/', '/llms.txt'],
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: 'https://www.pytafix.web.id/sitemap.xml',
  }
}
