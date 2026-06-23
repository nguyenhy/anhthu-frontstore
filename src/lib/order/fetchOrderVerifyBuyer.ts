import { fetchFromBff } from "../fetch";

export type OrderVerifyBuyerData = {
  readonly id: string;
  readonly slug: string;

  readonly buyer: {
    readonly id: string;
    readonly verify_code: string;
    readonly verified_at: string | null;
    readonly verify_expires_at: string | null;
  } | null;
};

export async function fetchOrderVerifyBuyer(
  slug: string,
  version?: string,
): Promise<OrderVerifyBuyerData | null> {
  const fields = [
    //
    "id",
    "slug",

    "buyer.id",
    "buyer.verify_code",
    "buyer.verified_at",
    "buyer.verify_expires_at",
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
          verify_code: raw.buyer.verify_code || "",
          verified_at: raw.buyer.verified_at || "",
          verify_expires_at: raw.buyer.verify_expires_at || "",
        }
      : null,
  };
}
