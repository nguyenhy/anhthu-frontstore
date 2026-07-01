import { StrapiOrderEvent, StrapiPaymentMethod } from "@/types/strapi";
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
    "buyer.date_created",
    "buyer.verified_at",
    "buyer.verify_expires_at",
    "buyer.verify_resend_at",

    // "coupon.type",
    // "coupon.amount",
    // "coupon.currency",
    // "coupon.cap_value",
    // "coupon.can_expired",
    // "coupon.expires_at",

    "price_at_purchase",
    "currency_at_purchase",
    "template_name_at_purchase",
    "discount_amount_at_purchase",
    "coupon_code_at_purchase",

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

    "order_fulfillment.date_created",
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
  const createdAt = dateCreated.toISOString();
  const deadlineAt = new Date(
    dateCreated.valueOf() + (raw.expired_after || 24) * 3600 * 1000,
  ).toISOString();

  // price/currency/template_name are always written together at order
  // creation (and by the backfill). A row with only some of them set is
  // corrupt, not "partially migrated" — treat it as no snapshot at all
  // rather than mixing snapshot and live values.
  // TODO: once these columns are NOT NULL, delete hasSnapshot and every
  // live-template fallback below. Same pattern in useSendConfirmPaymentEmail.ts
  // and frontstore_api_endpoint/index.ts GET /order/:slug — remove together.
  const hasSnapshot =
    raw.price_at_purchase != null &&
    raw.currency_at_purchase != null &&
    raw.template_name_at_purchase != null;

  return {
    order: {
      token: raw.slug,
      orderNumber: raw.order_id,
      createdAt: createdAt,
      deadlineAt: deadlineAt,

      buyer: raw.buyer
        ? {
            email: raw.buyer.email || "",
            name: raw.buyer.name || "",
            phone: raw.buyer.phone || "",
            verified_at: raw.buyer.verified_at || "",
            verify_expires_at: raw.buyer.verify_expires_at || "",
            verify_resend_at: raw.buyer.verify_resend_at || "",
            date_created: raw.buyer.date_created || "",
          }
        : null,

      templateName: hasSnapshot ? raw.template_name_at_purchase! : raw.template.name,
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

      currency: hasSnapshot ? raw.currency_at_purchase! : raw.template.product.currency,
      subtotal: hasSnapshot ? raw.price_at_purchase! : raw.template.product.price,
      discount: hasSnapshot ? Number(raw.discount_amount_at_purchase ?? 0) : 0,
      total: hasSnapshot
        ? raw.price_at_purchase! - Number(raw.discount_amount_at_purchase ?? 0)
        : raw.template.product.price,
      // amount here is the resolved currency amount actually deducted, so
      // type is always "fixed" regardless of the coupon's original percent
      // vs fixed rule — cap is only meaningful pre-resolution, so omitted.
      coupon: raw.coupon_code_at_purchase
        ? {
            code: raw.coupon_code_at_purchase,
            type: "fixed" as const,
            amount: Number(raw.discount_amount_at_purchase ?? 0),
          }
        : null,

      user_paid_at: raw.order_fulfillment[0]?.date_created,
    },
    paymentMethods: paymentMethods,
  } satisfies OrderPageData;
}
