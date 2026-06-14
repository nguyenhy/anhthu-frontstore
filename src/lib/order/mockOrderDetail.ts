import type { OrderPageData, StrapiOrderDetail } from "./types";
import type { StrapiPaymentMethod } from "@/lib/payment/types";

const MOCK_PAYMENT_METHODS: StrapiPaymentMethod[] = [
  {
    slug: "vietcombank-bank",
    displayName: "Vietcombank",
    type: "bank",
    accountNumber: "1234 5678 9012",
    accountName: "NGUYEN VAN AN",
    active: true,
    sortOrder: 1,
  },
  {
    slug: "momo-wallet",
    displayName: "MoMo",
    type: "ewallet",
    accountNumber: "9012 1234 5678",
    accountName: "NGUYEN VAN AN",
    qrImageUrl: "https://picsum.photos/400/400",
    active: true,
    sortOrder: 2,
  },
];

const BASE_ORDER: StrapiOrderDetail = {
  token: "mock-token-pending",
  orderNumber: "TMP-A3X",
  status: "pending",
  createdAt: new Date().toISOString(),
  deadlineAt: new Date(Date.now() + 10 * 1000).toISOString(),

  buyerEmail: "khoa.tran@example.com",
  buyerName: "Tran Minh Khoa",
  buyerPhone: "+84 90 123 4567",

  snapshotName: "Freelancer Invoice Tracker",
  snapshotCurrency: "VND",
  snapshotEmoji: "📊",
  snapshotCategoryName: "Finance",

  subtotal: 500000,
  discount: 0,
  total: 500000,

  coupon: null,
  timeline: [
    {
      id: "evt-1",
      status: "pending",
      occurredAt: "2024-06-01T10:42:00Z",
      actor: "system",
      correction: false,
    },
  ],

  orderPendingDesc: [
    {
      type: "paragraph",
      children: [
        {
          type: "text",
          text: "Complete payment using the details below. Delivery ",
        },
        { type: "text", text: "within 24h", bold: true },
        { type: "text", text: " after payment is confirmed." },
      ],
    },
  ],
  orderDeliveredDesc: [
    {
      type: "paragraph",
      children: [
        { type: "text", text: "Your template has been sent. Check your " },
        { type: "text", text: "email", bold: true },
        { type: "text", text: " for the Google Drive access link." },
      ],
    },
  ],
};

const mockOrderPending: StrapiOrderDetail = BASE_ORDER;

const mockOrderPendingWithCoupon: StrapiOrderDetail = {
  ...BASE_ORDER,
  token: "mock-token-coupon",
  orderNumber: "TMP-B2Y",
  subtotal: 500000,
  discount: 50000,
  total: 450000,
  coupon: { code: "LAUNCH10", type: "percent", amount: 10 },
};

const mockOrderDelivered: StrapiOrderDetail = {
  ...BASE_ORDER,
  token: "mock-token-delivered",
  orderNumber: "TMP-D4W",
  status: "delivered",

  subtotal: 500000,
  discount: 50000,
  total: 450000,

  coupon: { code: "LAUNCH10", type: "percent", amount: 10 },
  timeline: [
    {
      id: "evt-1",
      status: "pending",
      occurredAt: "2024-06-01T10:42:00Z",
      actor: "system",
      correction: false,
    },
    {
      id: "evt-2",
      status: "payment_confirmed",
      occurredAt: "2024-06-02T09:05:00Z",
      actor: "admin",
      correction: false,
    },
    {
      id: "evt-3",
      status: "delivered",
      occurredAt: "2024-06-02T09:30:00Z",
      actor: "admin",
      correction: false,
    },
  ],
};

export async function fetchOrderDetail(
  token: string,
): Promise<OrderPageData | null> {
  await new Promise((r) => setTimeout(r, 80));

  const map: Record<string, StrapiOrderDetail> = {
    [mockOrderPending.token]: mockOrderPending,
    [mockOrderPendingWithCoupon.token]: mockOrderPendingWithCoupon,
    [mockOrderDelivered.token]: mockOrderDelivered,
  };

  let order = map[token];
  if (!order) return null;

  order = {
    ...order,
    createdAt: new Date().toISOString(),
    deadlineAt: new Date(Date.now() + 10 * 1000).toISOString(),
  };

  return { order, paymentMethods: MOCK_PAYMENT_METHODS };
}
