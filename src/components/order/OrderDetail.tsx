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
import { ContactForm } from "./ContactForm";
import { HelpCard } from "./HelpCard";

type OrderDetailProps = { data: OrderPageData };

export default function OrderDetail({ data }: OrderDetailProps) {
	const { order, paymentMethods } = data;

	const parsed = useOrderDetail({ ...data, labels: ORDER_PRICING_LABELS })
	const {
		isPending,
		hasContact,
		appliedCoupon, couponApplying, couponError,
		copiedField, copyValue,
		total, currency, pricingRows,
		contactUrl,
		isAmountDueValid,
		handleApplyCoupon,
	} = parsed;
	console.log(order, paymentMethods);


	return (
		<main className="page">
			<OrderHeader
				orderNumber={order.orderNumber}
				createdAt={order.createdAt || ''}
				name={order.templateName}
			/>

			<div className="grid">
				<div className="col-main">
					<StatusBanner
						status={order.status}
					/>

					<OrderTimeline
						timeline={order.timeline}
						currentStatus={order.status}
					/>

					{!!isPending && !!isAmountDueValid && !!hasContact && !!paymentMethods && (
						<PaymentSection
							paymentMethods={paymentMethods}
							total={total}
							currency={currency}
							copiedField={copiedField}
							onCopy={copyValue}
							reference={order.orderNumber}
							deadlineAt={order.deadlineAt || ''}
						/>
					)}
				</div>

				<div className="col-side">
					<OrderSummary
						templateName={order.templateName}
						templateSlug={order.templateSlug}
						thumbnail={order.thumbnail}
						category={order.category}
						pricingRows={pricingRows}
						appliedCoupon={appliedCoupon}
						couponApplying={couponApplying}
						couponError={couponError}
						onApplyCoupon={handleApplyCoupon}
					/>

					{hasContact ? (
						<BuyerInfo
							buyerEmail={order.buyerEmail}
							buyerName={order.buyerName}
							buyerPhone={order.buyerPhone}
						/>
					) : (
						<ContactForm token={order.token} />
					)}

					<HelpCard contactUrl={contactUrl} />
				</div>
			</div>
		</main>
	);
}
