import type { StatusConfig } from "@/components/order/StatusBanner";
import type { StrapiOrderStatus } from "@/lib/order/types";

export const ORDER_STATUS_CONFIG: Record<StrapiOrderStatus, StatusConfig> = {
  pending: {
    icon: "⏳",
    label: "Chờ thanh toán",
    desc: "Vui lòng thanh toán theo thông tin bên dưới. Chúng tôi sẽ xác nhận đơn hàng trong vòng 24 giờ sau khi nhận được thanh toán.",
    variant: "pending",
  },
  payment_confirmed: {
    icon: "🔄",
    label: "Đã nhận thanh toán — đang chuẩn bị",
    desc: "Chúng tôi đã xác nhận thanh toán và đang chuẩn bị template. Bạn sẽ nhận được quyền truy cập sớm thôi.",
    variant: "confirmed",
  },
  delivered: {
    icon: "✅",
    label: "Đã giao — liên hệ nếu cần hỗ trợ",
    desc: "Template đã được gửi. Kiểm tra email trong đơn hàng để nhận link Google Drive.",
    variant: "delivered",
  },
  expired: {
    icon: "⛔",
    label: "Đơn hàng đã hết hạn",
    desc: "Đơn hàng này đã hết hạn. Vui lòng liên hệ nếu bạn vẫn cần template này.",
    variant: "expired",
  },
  disputed: {
    icon: "🔍",
    label: "Đang xem xét",
    desc: "Đội ngũ của chúng tôi đang xem xét đơn hàng và sẽ liên hệ trực tiếp với bạn.",
    variant: "disputed",
  },
  completed: {
    icon: "✅",
    label: "Hoàn tất",
    desc: "Đơn hàng này đã được thực hiện.",
    variant: "delivered",
  },
};
