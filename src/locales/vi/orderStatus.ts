import type { StatusConfig } from "@/components/order/StatusBanner";
import type { StrapiOrderStatus } from "@/lib/order/types";

export const ORDER_STATUS_CONFIG: Record<StrapiOrderStatus, StatusConfig> = {
  idle: {
    icon: "📝",
    label: "Nhập thông tin liên hệ",
    desc: "Vui lòng điền thông tin liên hệ để bắt đầu đặt hàng.",
    variant: "pending",
  },
  contact_provided: {
    icon: "✉️",
    label: "Xác thực Email",
    desc: "Đã nhận thông tin. Vui lòng kiểm tra hộp thư và nhấn vào liên kết xác thực để tiếp tục.",
    variant: "pending",
  },
  contact_verified: {
    icon: "⏳",
    label: "Chờ thanh toán",
    desc: "Xác thực email thành công. Vui lòng hoàn tất thanh toán theo thông tin bên dưới.",
    variant: "pending",
  },
  payment_received: {
    icon: "📦",
    label: "Đã xác nhận thanh toán",
    desc: "Đã nhận tiền. Chúng tôi đang chuẩn bị mẫu giao diện cho bạn.",
    variant: "confirmed",
  },
  delivered: {
    icon: "🎉",
    label: "Đã bàn giao",
    desc: "Kiểm tra email để nhận liên kết Google Drive. Liên hệ hỗ trợ nếu cần.",
    variant: "delivered",
  },
  expired: {
    icon: "⛔",
    label: "Đơn hàng hết hạn",
    desc: "Phiên làm việc đã hết hạn. Vui lòng liên hệ hỗ trợ nếu cần trợ giúp.",
    variant: "expired",
  },
  disputed: {
    icon: "🔍",
    label: "Đang khiếu nại / rà soát",
    desc: "Đội ngũ đang kiểm tra đơn hàng và sẽ liên hệ trực tiếp với bạn.",
    variant: "disputed",
  },
  completed: {
    icon: "✅",
    label: "Hoàn thành",
    desc: "Đơn hàng đã được xử lý hoàn tất.",
    variant: "completed",
  },
};
