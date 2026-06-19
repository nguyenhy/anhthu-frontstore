"use client";

import { useCallback, useMemo, useState } from "react";
import type { OrderPageData, RawAppliedCoupon } from "@/lib/order/types";
import type { ORDER_PRICING_LABELS } from "@/locales/en/orderPricing";
import { applyCoupon } from "@/lib/order/applyCoupon";
import { formatMoney } from "@/lib/formatCurrency";


export type PricingRow = {
  label: string;
  value: string;
  type: "normal" | "discount" | "total";
};

export type SummaryPricingRows = {
  subtotal: PricingRow;
  discounts?: PricingRow;
  total: PricingRow;
};

export type PricingLabels = typeof ORDER_PRICING_LABELS;

export function useOrderDetail({
  order,
  labels,
}: OrderPageData & { labels: PricingLabels }) {
  const isPending = order.status === "pending";
  const isDelivered = order.status === "delivered";
  const hasContact = !!order.buyerEmail;

  const [couponApplying, setCouponApplying] = useState(false);
  const [couponError, setCouponError] = useState("");
  const currency = order.currency;

  const [appliedCoupon, setAppliedCoupon] = useState<RawAppliedCoupon | null>(
    order.coupon
      ? {
          code: order.coupon.code,
          discount: order.discount,
          label: labels.discount.replace("%s", order.coupon.code),
        }
      : null,
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [total, setTotal] = useState(order.total);

  const subtotal = order.subtotal;
  const discount = appliedCoupon?.discount ?? 0;

  const isAmountDueValid = useMemo(
    () =>
      !isNaN(total) &&
      total > 0 &&
      subtotal >= 0 &&
      !!(appliedCoupon ? discount >= 0 : true),
    [total, subtotal, discount, appliedCoupon],
  );

  const pricingRows = useMemo((): SummaryPricingRows => {
    return {
      subtotal: {
        label: labels.subtotal,
        value: formatMoney(subtotal, currency),
        type: "normal",
      },
      discounts:
        discount > 0 && appliedCoupon
          ? {
              label: labels.discount.replace("%s", appliedCoupon.code),
              value: `−${formatMoney(discount, currency)}`,
              type: "discount",
            }
          : undefined,
      total: {
        label: labels.total,
        value: formatMoney(total, currency),
        type: "total",
      },
    };
  }, [subtotal, discount, total, currency, appliedCoupon, labels]);

  const contactUrl = `/contact?ref=order&id=${order.orderNumber}`;

  const copyValue = useCallback(async (key: string, value: string) => {
    await navigator.clipboard.writeText(value.replace(/\s/g, ""));
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 1_800);
  }, []);

  const handleApplyCoupon = useCallback(
    async (code: string) => {
      if (!code || couponApplying) return;
      setCouponApplying(true);
      setCouponError("");
      const result = await applyCoupon(order.token, code);
      if (result.status === "success") {
        setAppliedCoupon(result.coupon);
        setTotal(result.total);
      } else {
        setCouponError(result.message);
      }
      setCouponApplying(false);
    },
    [couponApplying, order.token],
  );

  return {
    isPending,
    isDelivered,
    hasContact,
    appliedCoupon,
    couponApplying,
    couponError,
    copiedField,
    copyValue,
    total,
    currency,
    pricingRows,
    contactUrl,
    isAmountDueValid,
    handleApplyCoupon,
  };
}
