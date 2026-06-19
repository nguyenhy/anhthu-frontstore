import { StrapiPaymentMethod } from "@/types/strapi";
import { fetchFromBff } from "../fetch";
import { getImageAssets, getImagePresignedUrl } from "../image/storage";
import { fetchPaymentMethods } from "../payment/fetchPaymentMethods";
import { OrderPageData } from "./types";

export async function fetchOrderDetail(
  slug: string,
  version?: string,
): Promise<OrderPageData | null> {
  const fields = [
    "id",
    "slug",
    "order_id",
    "expired_after",

    "buyer.email",
    "buyer.name",
    "buyer.phone",

    "status",
    "events.status",

    // "coupon.type",
    // "coupon.amount",
    // "coupon.currency",
    // "coupon.cap_value",
    // "coupon.can_expired",
    // "coupon.expires_at",

    "template.thumbnail.filename_disk",
    "template.thumbnail.filename_download",
    "template.thumbnail.width",
    "template.thumbnail.height",
    "template.thumbnail.type",
    "template.thumbnail.description",

    "template.name",
    "template.slug",
    "template.product.price",
    "template.product.currency",
    "template.category.emoji",
    "template.category.name",
    "template.category.slug",

    "date_created",
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
    console.log(new Date().toISOString(), "fetchOrderDetail", await res.json());
    throw new Error(`fetch failed: ${res.status}`);
  }

  const json = await res.json();
  const raw = json?.data?.[0];

  if (!raw) {
    return null;
  }

  let thumbnail = "";
  try {
    thumbnail = getImageAssets(raw.template.thumbnail.filename_disk, {
      width: 100,
      height: 100,
    });
  } catch (error) {
    console.error(new Date().toISOString(), "fetchOrderDetail", String(error));
  }

  let paymentMethods: StrapiPaymentMethod[] = [];
  if (raw.buyer) {
    try {
      paymentMethods = await fetchPaymentMethods(version);
    } catch (error) {
      console.error(
        new Date().toISOString(),
        "fetchOrderDetail",
        String(error),
      );
    }
  }

  const dateCreated = new Date(raw.date_created);
  const inValidDateCreated = isNaN(dateCreated.valueOf());
  const createdAt = inValidDateCreated ? null : dateCreated.toISOString();
  const deadlineAt = inValidDateCreated
    ? null
    : new Date(
        dateCreated.valueOf() + (raw.expired_after || 24) * 3600 * 1000,
      ).toISOString();

  return {
    order: {
      token: raw.slug,
      orderNumber: raw.order_id,
      status: raw.status,
      createdAt: createdAt,
      deadlineAt: deadlineAt,

      buyerEmail: raw.buyer ? raw.buyer.email : "",
      buyerName: raw.buyer ? raw.buyer.name : "",
      buyerPhone: raw.buyer ? raw.buyer.phone : "",

      templateName: raw.template.name,
      templateSlug: raw.template.slug,
      thumbnail: {
        url: thumbnail,
        width: raw.template.thumbnail.width,
        height: raw.template.thumbnail.height,
        type: raw.template.thumbnail.type,
        key: raw.template.thumbnail.key,
        label: raw.template.thumbnail.label,
        ariaLabel: raw.template.thumbnail.description,
      },
      category: raw.template.category,

      currency: raw.template.product.currency,
      subtotal: raw.template.product.price,
      discount: 0,
      total: raw.template.product.price,
      coupon: null,
      timeline: raw.events,
    },
    paymentMethods: paymentMethods,
  } satisfies OrderPageData;
}
