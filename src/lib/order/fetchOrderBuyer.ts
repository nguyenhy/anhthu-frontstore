import { fetchFromBff } from "../fetch";

export type OrderBuyerData = {
  readonly id: string;
  readonly slug: string;

  readonly buyer: {
    readonly id: string;
    readonly email: string;
    readonly name?: string | null;
    readonly phone?: string | null;
  } | null;
};

export async function fetchOrderBuyer(
  slug: string,
  version?: string,
): Promise<OrderBuyerData | null> {
  const search = new URLSearchParams();
  if (version) search.append("version", version);

  const query = search.toString();
  const res = await fetchFromBff(
    `/frontstore/order/${slug}/buyer${query ? `?${query}` : ""}`,
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);

  const json = await res.json();
  if (!json) return null;

  return {
    id: json.id,
    slug: json.slug,
    buyer: json.buyer
      ? { id: json.buyer.id, email: json.buyer.email, name: json.buyer.name ?? null, phone: json.buyer.phone ?? null }
      : null,
  } satisfies OrderBuyerData;
}
