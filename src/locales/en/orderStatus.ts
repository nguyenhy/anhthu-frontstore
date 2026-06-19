import type { StatusConfig } from "@/components/order/StatusBanner";
import type { StrapiOrderStatus } from "@/lib/order/types";

export const ORDER_STATUS_CONFIG: Record<StrapiOrderStatus, StatusConfig> = {
  pending: {
    icon: "⏳",
    label: "Waiting for payment",
    desc: "Please make payment using the information below. We will confirm your order within 24 hours of receiving payment.",
    variant: "pending",
  },
  payment_confirmed: {
    icon: "🔄",
    label: "Payment received — preparing",
    desc: "We have confirmed payment and are preparing the template. You will have access soon.",
    variant: "confirmed",
  },
  delivered: {
    icon: "✅",
    label: "Delivered — contact us if you need support",
    desc: "Template has been sent. Check your order email for the Google Drive link.",
    variant: "delivered",
  },
  expired: {
    icon: "⛔",
    label: "Order has expired",
    desc: "This order has expired. Please contact us if you still need this template.",
    variant: "expired",
  },
  disputed: {
    icon: "🔍",
    label: "Under review",
    desc: "Our team is reviewing the order and will contact you directly.",
    variant: "disputed",
  },
  completed: {
    icon: "✅",
    label: "Completed",
    desc: "This order has been fulfilled.",
    variant: "completed",
  },
};
