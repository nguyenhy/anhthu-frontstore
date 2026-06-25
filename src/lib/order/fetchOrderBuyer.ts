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
  const fields = [
    //
    "id",
    "slug",

    "buyer.id",
    "buyer.email",
    "buyer.name",
    "buyer.phone",
  ];
  const search = new URLSearchParams();
  if (version) {
    search.append("version", version);
  }
  search.append("filter[slug][_eq]", slug);
  search.append("limit", "1");
  search.append("fields", fields.join(","));

  const res = await fetchFromBff(`/items/order?${search.toString()}`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    console.log(new Date().toISOString(), "fetchOrderBuyer", await res.json());
    throw new Error(`fetch failed: ${res.status}`);
  }

  const json = await res.json();
  const raw = json?.data?.[0];

  if (!raw) {
    return null;
  }

  return {
    id: raw.id,
    slug: raw.slug,
    buyer: raw.buyer
      ? {
          id: raw.buyer.id || "",
          email: raw.buyer.email || "",
          name: raw.buyer.name || "",
          phone: raw.buyer.phone || "",
        }
      : null,
  };
}
