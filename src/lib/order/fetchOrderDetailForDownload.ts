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
  const search = new URLSearchParams();
  if (version) search.append("version", version);

  const query = search.toString();
  const res = await fetchFromBff(
    `/frontstore/order/${slug}/download${query ? `?${query}` : ""}`,
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);

  const json = await res.json();
  if (!json) return null;

  return {
    template: json.template
      ? { product: json.template.product ? { url: json.template.product.url } : undefined }
      : undefined,
    order_fulfillment: json.order_fulfillment ?? undefined,
  } satisfies OrderDetailForDownload;
}
