import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow everything including all AI crawlers
      {
        userAgent: '*',
        allow: '/',
        // Block internal API routes and Next.js internals from indexing
        disallow: ['/api/', '/_next/'],
      },
      // Google — search + AI (Bard/Gemini training)
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      // Bing + Copilot
      { userAgent: 'Bingbot', allow: '/' },
      // Apple
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      // OpenAI — ChatGPT browsing + training
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      // Anthropic — Claude training
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      // Perplexity
      { userAgent: 'PerplexityBot', allow: '/' },
      // Meta — Llama training
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      { userAgent: 'Meta-ExternalFetcher', allow: '/' },
      // Common Crawl — feeds many LLM training datasets
      { userAgent: 'CCBot', allow: '/' },
      // Cohere
      { userAgent: 'cohere-ai', allow: '/' },
      // You.com
      { userAgent: 'YouBot', allow: '/' },
    ],
    sitemap: 'https://simplakit.com/sitemap.xml',
  }
}
