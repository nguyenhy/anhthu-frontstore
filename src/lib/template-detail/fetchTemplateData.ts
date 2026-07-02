import { fetchFromBff } from "../fetch";
import { createLogger } from "../logger";
import { StrapiTemplateDetail } from "./types";

export async function fetchTemplateDetail(
  slug: string,
  version?: string,
): Promise<StrapiTemplateDetail | null> {
  const search = new URLSearchParams();
  if (version) search.append("version", version);

  const logger = createLogger();
  const query = search.toString();
  const res = await fetchFromBff(
    `/frontstore/template/${slug}${query ? `?${query}` : ""}`,
    undefined,
    {
      logger: logger,
    },
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    logger.error(["not_ok", await res.text()]);
    throw new Error(`fetch failed: ${res.status}`);
  }

  const json = await res.json();
  if (!json) {
    logger.error(["empty json", json]);
    return null;
  }

  return {
    id: json.id,
    slug: json.slug,
    name: json.name,
    category: json.category,
    tagline: json.tagline ?? "",
    price: json.price,
    currency: json.currency,
    priceSub: json.priceSub ?? "",
    deliveryNote: json.deliveryNote ?? "",
    compatNote: json.compatNote ?? "",
    metaList: json.metaList ?? [],
    thumbnail: json.thumbnail ?? null,
    galleryTabs: json.galleryTabs ?? [],
    description: json.description ?? [],
    earlyOffer: json.earlyOffer ?? null,
    rating: json.rating || null,
    description_html: json.description_html || null,
    features: json.features || null,
    faqs: json.faqs || null,
  } satisfies StrapiTemplateDetail;
}
