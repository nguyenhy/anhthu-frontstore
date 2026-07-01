import { StrapiPaymentMethod } from "@/types/strapi";
import { fetchFromBff } from "../fetch";
import { OrderPageData } from "./types";

export async function fetchOrderDetail(
  slug: string,
  version?: string,
): Promise<OrderPageData | null> {
  const search = new URLSearchParams();
  if (version) search.append("version", version);

  const query = search.toString();
  const res = await fetchFromBff(
    `/frontstore/order/${slug}${query ? `?${query}` : ""}`,
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);

  const json = await res.json();
  if (!json) return null;

  const paymentMethods: StrapiPaymentMethod[] = json.paymentMethods ?? [];

  return {
    order: {
      token: json.token,
      orderNumber: json.orderNumber,
      createdAt: json.createdAt,
      deadlineAt: json.deadlineAt,
      buyer: json.buyer,
      templateName: json.templateName,
      templateSlug: json.templateSlug,
      thumbnail: json.thumbnail,
      category: json.category,
      currency: json.currency,
      subtotal: json.subtotal,
      discount: json.discount,
      total: json.total,
      coupon: json.coupon,
      user_paid_at: json.user_paid_at,
    },
    paymentMethods,
  } satisfies OrderPageData;
}
