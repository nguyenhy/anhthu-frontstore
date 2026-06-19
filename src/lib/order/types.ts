import type { StrapiOrderDetail, StrapiPaymentMethod } from "@/types/strapi";

export type {
  StrapiOrderStatus,
  StrapiOrderActor,
  StrapiOrderEvent,
  StrapiCouponSnapshot,
  StrapiOrderDetail,
} from "@/types/strapi";

// Combined payload returned by fetchOrderDetail / mockOrderDetail
export type OrderPageData = {
  order: StrapiOrderDetail;
  paymentMethods?: StrapiPaymentMethod[];
};

// --- Component display types (computed by useOrderDetail from raw shapes) ---

export type RawTimelineStepState = "done" | "active" | "future";

export type RawTimelineStep = {
  key: string;
  title: string;
  description: string;
  state: RawTimelineStepState;
  timestamp?: string; // ISO 8601 — present when state is "done"
};

export type RawAppliedCoupon = {
  code: string;
  discount: number;
  label: string;
};

export type ContactFormData = {
  email: string;
  name?: string;
  phone?: string;
};
