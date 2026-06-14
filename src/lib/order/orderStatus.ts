import { RichText } from "@/components/RichTextRender";

export type OrderStatus = "pending" | "delivered";

export type PaymentMethodType = "bank" | "momo";

export interface PaymentMethod {
  value: PaymentMethodType;
  label: string;
}

export interface TimelineItem {
  title: string;
  description: string;
  state: "done" | "active" | "future";
}

export interface PaymentField {
  label: string;
  value: string;
  copyable?: boolean;
  copyId?: string;
}

export interface OrderSummaryRow {
  label: string;
  value: string;
  type?: "normal" | "discount" | "total";
}

export interface BuyerInfoItem {
  label: string;
  value: string;
}

export interface HelpCardContent {
  title: string;
  content: RichText;
  linkText: string;
}

export interface UpsellContent {
  title: string;
  content: RichText;
  emailPlaceholder: string;
  buttonText: string;
}

export interface OrderDetailContent {
  orderLabel: string;
  orderNumber: string;
  orderMeta: string;

  status: {
    state: string;
    icon: string;
    title: string;
    description: RichText;
  };

  timeline: {
    pending: TimelineItem[];
    delivered: TimelineItem[];
  };

  paymentTitle: string;

  deadlineContent: RichText;

  paymentMethods: PaymentMethod[];

  bankTransfer: {
    note: RichText;
    fields: PaymentField[];
  };

  momo: {
    qrPlaceholder: string;
    description: RichText;
  };

  orderSummary: {
    title: string;
    productIcon: string;
    productName: string;
    productDescription: string;
    rows: OrderSummaryRow[];

    couponPlaceholder: string;
    couponButtonText: string;

    couponSuccessText: string;
    couponErrorText: string;
  };

  buyer: {
    title: string;
    items: BuyerInfoItem[];
  };

  helpCard: HelpCardContent;
  contactUrl: string;

  upsell: UpsellContent;
}
