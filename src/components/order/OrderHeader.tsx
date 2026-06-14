import { formatDate } from "@/lib/formatDate";

type Props = {
  orderNumber: string;
  createdAt: string;
  name: string;
};

export function OrderHeader({ orderNumber, createdAt, name }: Props) {
  const orderMeta = `Placed ${formatDate(createdAt)} - ${name}`;

  return (
    <div style={{ marginBottom: "var(--sp-xl)" }}>
      <p style={{ fontSize: "13px", color: "var(--mute)", marginBottom: "var(--sp-xs)" }}>
        Order
      </p>
      <h1 style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.025em", color: "var(--ink)" }}>
        {orderNumber}
      </h1>
      <p style={{ fontSize: "14px", color: "var(--mute)", marginTop: "4px" }}>
        {orderMeta}
      </p>
    </div>
  );
}
