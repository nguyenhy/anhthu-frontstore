import { fetchFromBff } from "../fetch";
import { StrapiTemplateDetail } from "./types";

export async function fetchTemplateDetail(
  slug: string,
): Promise<StrapiTemplateDetail | null> {
  const search = new URLSearchParams();
  search.set("filters[slug][$eq]", slug);
  search.set("populate", "deep");
  const url = `/api/template-details?${search.toString()}`;
  const res = await fetchFromBff(url);

  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${url}`);
  }

  const json = await res.json();
  const raw: StrapiTemplateDetail = json?.data?.[0];

  if (!raw) {
    throw new Error(`Template not found in Strapi: slug="${slug}"`);
  }

  return raw;
}
