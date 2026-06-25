import clsx from "clsx";
import { useMemo } from "react";
import { formatDate } from "@/lib/formatDate";
import type { StrapiOrderDetail, StrapiOrderStatus, RawTimelineStep } from "@/lib/order/types";

const STATUS_ORDER: StrapiOrderStatus[] = ['idle', 'payment_received', "delivered"];
export type TimeLineDatetime = {
  orderCreatedAt: string
  contactCreatedAt: string
  contactVerifiedAt: string
  paymentReceivedAt: string
  productDeliverAt: string
}

export function createOrderTimelineDate(order: StrapiOrderDetail): TimeLineDatetime {
  return {
    orderCreatedAt: order.createdAt,
    contactCreatedAt: order.buyer?.date_created || '',
    contactVerifiedAt: order.buyer?.verified_at || '',
    paymentReceivedAt: order.user_paid_at || '',
    productDeliverAt: order.user_paid_at || ''
  }
}

export function getOrderStatus(date: TimeLineDatetime): StrapiOrderStatus {
  if (date.productDeliverAt) return 'delivered';
  if (date.paymentReceivedAt) return 'payment_received';
  if (date.contactVerifiedAt) return 'contact_verified';
  if (date.contactCreatedAt) return 'contact_provided';
  return 'idle';
}


function deriveTimelineSteps(date: TimeLineDatetime): RawTimelineStep[] {
  const isPaid = !!date.paymentReceivedAt;
  const isDelivered = !!date.productDeliverAt;

  return [
    {
      key: "order_placed",
      title: "Order placed",
      description: "Your order has been received.",
      state: "done",
      timestamp: date.orderCreatedAt,
    },
    isPaid
      ? {
        key: "payment_confirmed",
        title: "Payment confirmed",
        description: "Transfer verified",
        state: isDelivered ? "done" : "active",
        timestamp: date.paymentReceivedAt,
      }
      : {
        key: "waiting_payment",
        title: "Waiting for payment",
        description: "Complete payment within 48 hours",
        state: "active",
        timestamp: undefined,
      },
    isDelivered
      ? {
        key: "delivered",
        title: "Template delivered",
        description: "Google Drive link sent to your email",
        state: "done",
        timestamp: date.productDeliverAt,
      }
      : {
        key: "delivered",
        title: "Template delivered",
        description: "Seller sends Google Drive access link by email",
        state: "future",
        timestamp: undefined,
      },
  ];
}

export const createOrderTimeline = (date: TimeLineDatetime) => {


  return { status }
}

type Props = {
  date: TimeLineDatetime
};

export function OrderTimeline({ date }: Props) {
  const steps = useMemo(
    () => deriveTimelineSteps(date),
    [date],
  );

  return (
    <div className="card">
      <p className="card-title">Progress</p>
      <ul className="timeline" id="timeline">
        {steps.map((step, i) => (
          <li key={step.key} className="tl-item">
            <div className="tl-track">
              <div className={clsx("tl-dot", step.state)}>
                <div className="tl-dot-inner" />
              </div>
              {i < steps.length - 1 && <div className="tl-line" />}
            </div>
            <div className="tl-content">
              <p className={clsx("tl-step", step.state === "future" && "future")}>
                {step.title}
              </p>
              <p className="tl-state">
                <span className="tl-time">{step.state === "done" && step.timestamp
                  ? `${formatDate(step.timestamp)} - `
                  : undefined}</span>
                <span className="tl-desc">{step.description}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
