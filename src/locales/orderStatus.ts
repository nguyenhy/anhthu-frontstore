import type { StatusConfig } from "@/components/order/StatusBanner";
import type { StrapiOrderStatus } from "@/lib/order/types";
import { ORDER_STATUS_CONFIG as vi } from "./vi/orderStatus";
import { ORDER_STATUS_CONFIG as en } from "./en/orderStatus";

const LOCALES = { vi, en } as const;
export type SupportedLocale = keyof typeof LOCALES;

export function getOrderStatusConfig(
  status: StrapiOrderStatus,
  locale: SupportedLocale = "en",
): StatusConfig {
  return LOCALES[locale][status];
}
