import { StrapiPaymentMethod } from "@/types/strapi";
import { fetchFromBff } from "../fetch";
import { getImageAssets } from "../image/storage";
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

  const t = json.thumbnail;
  const thumbnailUrl = t?.disk
    ? getImageAssets(t.disk, { width: 100, height: 100 })
    : "";

  const paymentMethods: StrapiPaymentMethod[] = (
    json.paymentMethods ?? []
  ).map(
    (pm: {
      name: string;
      type: string;
      logoDisk: string | null;
      accountName: string;
      accountNumber: string;
      note: string | null;
    }) => ({
      name: pm.name,
      type: pm.type,
      logo: pm.logoDisk ? getImageAssets(pm.logoDisk, { height: 400 }) : null,
      accountName: pm.accountName,
      accountNumber: pm.accountNumber,
      note: pm.note ?? undefined,
    }),
  );

  return {
    order: {
      token: json.token,
      orderNumber: json.orderNumber,
      createdAt: json.createdAt,
      deadlineAt: json.deadlineAt,
      buyer: json.buyer,
      templateName: json.templateName,
      templateSlug: json.templateSlug,
      thumbnail: {
        url: thumbnailUrl,
        width: t?.width ?? null,
        height: t?.height ?? null,
        type: t?.type ?? null,
        key: null,
        label: null,
        ariaLabel: t?.ariaLabel ?? null,
      },
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
