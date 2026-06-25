import type { OrderPageData, StrapiOrderDetail } from "./types";
import type { StrapiPaymentMethod } from "@/lib/payment/types";

const MOCK_PAYMENT_METHODS: StrapiPaymentMethod[] = [
  {
    name: "Vietcombank",
    type: "bank",
    accountNumber: "1234 5678 9012",
    accountName: "NGUYEN VAN AN",
    sortOrder: 1,
  },
  {
    name: "MoMo",
    type: "ewallet",
    accountNumber: "9012 1234 5678",
    accountName: "NGUYEN VAN AN",
    qrImageUrl: "https://picsum.photos/400/400",
    sortOrder: 2,
  },
];

const BASE_ORDER: StrapiOrderDetail = {
  token: "mock-token-pending",
  orderNumber: "TMP-A3X",
  createdAt: new Date().toISOString(),
  deadlineAt: new Date(Date.now() + 10 * 1000).toISOString(),

  buyer: {
    email: "khoa.tran@example.com",
    name: "Tran Minh Khoa",
    phone: "+84 90 123 4567",
    date_created: "2026-06-24T03:46:08.816Z",
  },

  templateName: "Freelancer Invoice Tracker",
  templateSlug: "freelancer-invoice-tracker",
  currency: "VND",
  thumbnail: {
    key: "",
    label: "",
    ariaLabel: "",
    url: "",
    width: "",
    height: "",
    type: "",
  },
  category: {
    slug: "",
    name: "",
    emoji: "",
  },

  subtotal: 500000,
  discount: 0,
  total: 500000,

  coupon: null,
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

  subtotal: 500000,
  discount: 50000,
  total: 450000,

  coupon: { code: "LAUNCH10", type: "percent", amount: 10 },
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
