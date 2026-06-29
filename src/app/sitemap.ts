import { fetchFromBff } from "@/lib/fetch";
import { createLogger } from "@/lib/logger";
import { getRawKey, isObject } from "@/lib/validate/extract";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const logger = createLogger();
  logger.info(["sitemap"]);

  const templates: MetadataRoute.Sitemap = [];
  try {
    const search = new URLSearchParams();
    search.set(
      "fields",
      [
        //
        "slug",
        "date_updated",
        "product.date_updated",
      ].join(","),
    );
    search.set("filter[archived][_neq]", "true");

    const response = await fetchFromBff(`/items/template?${search}`);
    if (response.ok) {
      const json = await response.json();
      const raw = !!json && isObject(json) ? json : null;
      const rawData = !!raw && getRawKey(raw, "data");
      const data = !!rawData && Array.isArray(rawData) ? rawData : [];

      logger.info(["sitemap", data.length]);

      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        const templateUpdatedAt = new Date(item.date_updated);
        const productUpdatedAt = new Date(item.product.date_updated);
        const updateAt = Math.max(
          productUpdatedAt.valueOf(),
          templateUpdatedAt.valueOf(),
        );
        const lastModified = isNaN(updateAt) ? new Date() : new Date(updateAt);
        const [route]: MetadataRoute.Sitemap = [
          {
            url: `https://simplakit.com/template/${item.slug}`,
            lastModified: lastModified,
            changeFrequency: "weekly",
            priority: 0.9,
          },
        ];
        templates.push(route);
      }
    } else {
      logger.info(["fetch.failed", response.ok, await response.text()]);
    }
  } catch (error) {
    logger.info(["fetch.error", String(error)]);
  }

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
    ...templates,
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
