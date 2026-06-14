import { fetchFromBff } from "../fetch";
import { StrapiContactPage } from "./types";

export async function fetchContactPageData(): Promise<StrapiContactPage | null> {
  const res = await fetchFromBff("/api/contact-page");

  if (res.status === 404) return null;

  if (!res.ok) {
    throw new Error(`BFF fetch failed: ${res.status}`);
  }

  const json = await res.json();
  const raw: StrapiContactPage = json?.data;

  if (!raw) {
    throw new Error(`Contact page not found in Strapi`);
  }

  return raw;
}
