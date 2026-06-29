import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // home
    {
      url: "https://simplakit.com",
      lastModified: new Date(
        "Mon Jun 29 2026 11:54:59 GMT+0700 (Indochina Time)",
      ),
      changeFrequency: "monthly",
      priority: 1,
    },

    // product
    {
      url: "https://simplakit.com/template/freelancer-invoice-tracker",
      lastModified: new Date(
        "Mon Jun 29 2026 11:54:59 GMT+0700 (Indochina Time)",
      ),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://simplakit.com/templates",
      lastModified: new Date(
        "Mon Jun 29 2026 11:54:59 GMT+0700 (Indochina Time)",
      ),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // contact
    {
      url: "https://simplakit.com/contact",
      lastModified: new Date(
        "Mon Jun 29 2026 11:54:59 GMT+0700 (Indochina Time)",
      ),
      priority: 0.3,
    },

    // legal
    {
      url: "https://simplakit.com/terms",
      lastModified: new Date(
        "Mon Jun 29 2026 11:54:59 GMT+0700 (Indochina Time)",
      ),
      priority: 0.5,
    },
    {
      url: "https://simplakit.com/privacy",
      lastModified: new Date(
        "Mon Jun 29 2026 11:54:59 GMT+0700 (Indochina Time)",
      ),
      priority: 0.5,
    },
    {
      url: "https://simplakit.com/refund",
      lastModified: new Date(
        "Mon Jun 29 2026 11:54:59 GMT+0700 (Indochina Time)",
      ),
      priority: 0.5,
    },
  ];
}
