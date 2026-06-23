import type { StatusConfig } from "@/components/order/StatusBanner";
import type { StrapiOrderStatus } from "@/lib/order/types";

export const ORDER_STATUS_CONFIG: Record<StrapiOrderStatus, StatusConfig> = {
  idle: {
    icon: "📝",
    label: "Enter Contact Info",
    desc: "Please provide your contact information to start the order process.",
    variant: "pending",
  },
  contact_provided: {
    icon: "✉️",
    label: "Verify Your Email",
    desc: "Contact information received. Please check your email and click the verification link to proceed.",
    variant: "pending",
  },
  contact_verified: {
    icon: "⏳",
    label: "Awaiting Payment",
    desc: "Email verified successfully. Please complete payment using the details below.",
    variant: "pending",
  },
  payment_received: {
    icon: "📦",
    label: "Payment Confirmed",
    desc: "Payment received. We are preparing your template now.",
    variant: "confirmed",
  },
  delivered: {
    icon: "🎉",
    label: "Template Delivered",
    desc: "Check your email for the Google Drive download link. Reach out if you need support.",
    variant: "delivered",
  },
  expired: {
    icon: "⛔",
    label: "Order Expired",
    desc: "This session has expired. Please contact support if you need assistance.",
    variant: "expired",
  },
  disputed: {
    icon: "🔍",
    label: "Under Review",
    desc: "Our team is reviewing this order and will reach out to you directly.",
    variant: "disputed",
  },
  completed: {
    icon: "✅",
    label: "Order Completed",
    desc: "This order is fully processed and complete.",
    variant: "completed",
  },
};
