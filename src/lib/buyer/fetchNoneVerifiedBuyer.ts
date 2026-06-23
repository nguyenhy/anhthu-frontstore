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

export async function fetchOrderNoneVerifiedBuyer(
  id: string,
  version?: string,
): Promise<OrderBuyerData | null> {
  const fields = [
    //
    "id",

    "buyer",
  ];
  const search = new URLSearchParams();
  if (version) {
    search.append("version", version);
  }
  search.append("filter[id][_eq]", id);
  search.append("filter[verified_at][_null]", "true");
  search.append("filter[verify_expires_at][_gt]", "$NOW");

  search.append("limit", "1");
  search.append("fields", fields.join(","));

  const res = await fetchFromBff(`/items/order?${search.toString()}`);
  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    console.log(new Date().toISOString(), "slug", await res.json());
    throw new Error(`fetch failed: ${res.status}`);
  }

  const json = await res.json();
  const raw = json?.data?.[0];
  console.log('code', raw);

  if (!raw) {
    return null;
  }

  return {
    id: raw.id,
    slug: raw.slug,
    buyer: raw.buyer.id,
  };
}
