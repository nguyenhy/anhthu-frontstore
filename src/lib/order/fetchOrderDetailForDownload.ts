import { fetchFromBff } from "../fetch";

export type OrderDetailForDownload = {
  template?: {
    product?: {
      url: string;
    };
  };
  order_fulfillment?: {
    date_created: string;
  }[];
};

export async function fetchOrderDetailForDownload(
  slug: string,
  version?: string,
): Promise<OrderDetailForDownload | null> {
  const fields = ["template.product.url", "order_fulfillment.date_created"];
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
    console.log(new Date().toISOString(), "fetchOrderDetail", await res.json());
    throw new Error(`fetch failed: ${res.status}`);
  }

  const json = await res.json();
  const raw = json?.data?.[0];

  if (!raw) {
    return null;
  }

  return raw;
}
