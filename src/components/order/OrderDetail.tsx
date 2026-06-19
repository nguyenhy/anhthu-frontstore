"use client";

import './OrderDetail.css';
import type { OrderPageData } from "@/lib/order/types";
import { useOrderDetail } from "./useOrderDetail";
import { ORDER_PRICING_LABELS } from "@/locales/en/orderPricing";
import { OrderHeader } from "./OrderHeader";
import { StatusBanner } from "./StatusBanner";
import { getOrderStatusConfig } from "@/locales/orderStatus";
import { OrderTimeline } from "./OrderTimeline";
import { PaymentSection } from "./PaymentSection";
import { OrderSummary } from "./OrderSummary";
import { BuyerInfo } from "./BuyerInfo";
import { HelpCard } from "./HelpCard";

type OrderDetailProps = { data: OrderPageData };

export default function OrderDetail({ data }: OrderDetailProps) {
	const { order, paymentMethods } = data;

	const {
		isPending,
		appliedCoupon, couponApplying, couponError,
		copiedField, copyValue,
		total, currency, pricingRows,
		contactUrl,
		isAmountDueValid,
		handleApplyCoupon,
	} = useOrderDetail({ ...data, labels: ORDER_PRICING_LABELS });

	return (
		<main className="page">
			<OrderHeader
				orderNumber={order.orderNumber}
				createdAt={order.createdAt}
				name={order.snapshotName}
			/>

			<div className="grid">
				<div className="col-main">
					<StatusBanner
						config={getOrderStatusConfig(order.status)}
						cmsDesc={
							order.status === "pending" ? order.orderPendingDesc :
								order.status === "delivered" ? order.orderDeliveredDesc :
									null
						}
					/>

					<OrderTimeline
						timeline={order.timeline}
						currentStatus={order.status}
					/>

					{!!isPending && !!isAmountDueValid && (
						<PaymentSection
							paymentMethods={paymentMethods}
							total={total}
							currency={currency}
							copiedField={copiedField}
							onCopy={copyValue}
							reference={order.orderNumber}
							deadlineAt={order.deadlineAt}
						/>
					)}
				</div>

				<div className="col-side">
					<OrderSummary
						snapshotName={order.snapshotName}
						snapshotEmoji={order.snapshotEmoji}
						snapshotCategoryName={order.snapshotCategoryName}
						pricingRows={pricingRows}
						appliedCoupon={appliedCoupon}
						couponApplying={couponApplying}
						couponError={couponError}
						onApplyCoupon={handleApplyCoupon}
					/>

					<BuyerInfo
						buyerEmail={order.buyerEmail}
						buyerName={order.buyerName}
						buyerPhone={order.buyerPhone}
					/>

					<HelpCard contactUrl={contactUrl} />
				</div>
			</div>
		</main>
	);
}
