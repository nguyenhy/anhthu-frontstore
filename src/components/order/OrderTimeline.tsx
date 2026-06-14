import clsx from "clsx";
import { useMemo } from "react";
import { formatDate } from "@/lib/formatDate";
import type { StrapiOrderEvent, StrapiOrderStatus, RawTimelineStep } from "@/lib/order/types";

const STATUS_ORDER: StrapiOrderStatus[] = ["pending", "payment_confirmed", "delivered"];

function deriveTimelineSteps(
  timeline: StrapiOrderEvent[],
  currentStatus: StrapiOrderStatus,
): RawTimelineStep[] {
  const currentIdx = STATUS_ORDER.indexOf(currentStatus);
  const eventByStatus = new Map(timeline.map((e) => [e.status, e]));

  function stepState(statusIdx: number) {
    if (statusIdx < currentIdx) return "done" as const;
    if (statusIdx === currentIdx) return "active" as const;
    return "future" as const;
  }

  const paymentEvent = eventByStatus.get("payment_confirmed");
  const deliveredEvent = eventByStatus.get("delivered");
  const waitingState = stepState(0);
  const paymentState = stepState(1);
  const deliveredState = stepState(2);

  return [
    {
      key: "order_placed",
      title: "Order placed",
      description: "Your order has been received.",
      state: "done",
      timestamp: eventByStatus.get("pending")?.occurredAt,
    },
    {
      key: "waiting_payment",
      title: "Waiting for payment",
      description: waitingState === "done" ? "Completed" : "Complete payment within 48 hours",
      state: waitingState,
      timestamp: waitingState === "done" ? paymentEvent?.occurredAt : undefined,
    },
    {
      key: "payment_confirmed",
      title: "Payment confirmed",
      description: paymentState === "done" ? "Transfer verified" : "Seller verifies your transfer",
      state: paymentState,
      timestamp: paymentState === "done" ? paymentEvent?.occurredAt : undefined,
    },
    {
      key: "delivered",
      title: "Template delivered",
      description:
        deliveredState === "done"
          ? "Google Drive link sent to your email"
          : "Seller sends Google Drive access link by email",
      state: deliveredState,
      timestamp: deliveredState === "done" ? deliveredEvent?.occurredAt : undefined,
    },
    {
      key: "done",
      title: "Done",
      description: "Enjoy your template",
      state: currentStatus === "delivered" ? "active" : "future",
    },
  ];
}

type Props = {
  timeline: StrapiOrderEvent[];
  currentStatus: StrapiOrderStatus;
};

export function OrderTimeline({ timeline, currentStatus }: Props) {
  const steps = useMemo(
    () => deriveTimelineSteps(timeline, currentStatus),
    [timeline, currentStatus],
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
              <p className="tl-time">
                {step.state === "done" && step.timestamp
                  ? formatDate(step.timestamp)
                  : step.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
