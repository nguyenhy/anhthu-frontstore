import { fetchFromBff } from "../fetch";
import type { StrapiOrderDetail, OrderPageData } from "./types";
import type { StrapiPaymentMethod } from "@/lib/payment/types";

export async function fetchOrderDetail(
  token: string,
): Promise<OrderPageData | null> {
  const [orderRes, paymentRes] = await Promise.all([
    fetchFromBff(`/api/orders/${token}`, {
      next: { revalidate: 0 },
    }),
    fetchFromBff(`/api/payment-instructions`, {
      next: { revalidate: 3600 },
    }),
  ]);

  if (orderRes.status === 404) return null;

  if (!orderRes.ok) {
    throw new Error(`BFF fetch failed: ${orderRes.status}`);
  }

  const raw = await orderRes.json();
  const order: StrapiOrderDetail = {
    ...raw,
    subtotal: raw.subtotal,
    discount: raw.discount,
    total: raw.total,
    coupon: raw.coupon ?? null,
  };
  const paymentMethods: StrapiPaymentMethod[] = paymentRes.ok
    ? await (paymentRes.json() as Promise<StrapiPaymentMethod[]>)
    : [];

  return { order, paymentMethods };
}
