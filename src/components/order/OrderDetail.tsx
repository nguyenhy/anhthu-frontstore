"use client";

import './OrderDetail.css';
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { OrderPageData, ContactFormData, StrapiOrderStatus, StrapiOrderEvent } from "@/lib/order/types";
import { submitContact } from "@/lib/order/submitContact";
import { useOrderDetail } from "./useOrderDetail";
import { ORDER_PRICING_LABELS } from "@/locales/en/orderPricing";
import { OrderHeader } from "./OrderHeader";
import { StatusBanner } from "./StatusBanner";
import { OrderTimeline } from "./OrderTimeline";
import { PaymentSection } from "./PaymentSection";
import { OrderSummary } from "./OrderSummary";
import { BuyerInfo } from "./BuyerInfo";
import { ContactForm } from "./ContactForm";
import { VerifyForm } from "./VerifyForm";
import { HelpCard } from "./HelpCard";
import { verifyContact } from '@/lib/order/verifyContact';
import { resendVerify } from '@/lib/order/resendVerify';

type OrderDetailProps = { data: OrderPageData };

export default function OrderDetail({ data }: OrderDetailProps) {
	const router = useRouter();
	const { order, paymentMethods } = data;

	const handleContactSubmit = useCallback(async (form: ContactFormData): Promise<string | undefined> => {
		const result = await submitContact(order.token, form);
		if (result.status === "success") {
			router.refresh();
			return undefined;
		}
		return result.message ?? "Something went wrong. Please try again.";
	}, [order.token, router]);

	const handleVerifySubmit = useCallback(async (code: string): Promise<string | undefined> => {
		const result = await verifyContact(order.token, code);
		if (result.status === "success") {
			router.refresh();
			return undefined;
		}
		return result.message ?? "Something went wrong. Please try again.";
	}, [order.token, router]);

	const handleResendVerify = useCallback(async (): Promise<string | undefined> => {
		const result = await resendVerify(order.token, code);
		if (result.status === "success") return undefined;
		return result.message ?? "Something went wrong. Please try again.";
	}, [order.token]);

	const parsed = useOrderDetail({ ...data, labels: ORDER_PRICING_LABELS });
	const {
		appliedCoupon, couponApplying, couponError,
		copiedField, copyValue,
		total, currency, pricingRows,
		contactUrl,
		isAmountDueValid,
		handleApplyCoupon,
		status, timeline
	} = parsed;


	return (
		<main className="page">
			<OrderHeader
				orderNumber={order.orderNumber}
				createdAt={order.createdAt || ''}
				name={order.templateName}
			/>

			<div className="grid">
				<div className="col-main">
					<StatusBanner status={status} />

					<OrderTimeline date={timeline} />

					{
						!!order.buyer?.email &&
						!!order.buyer?.verified_at &&
						!!isAmountDueValid
						&& !!paymentMethods && (
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

					{!order.buyer && (
						<ContactForm onSubmit={handleContactSubmit} />
					)}

					{order.buyer && !order.buyer.verified_at && (
						<VerifyForm onSubmit={handleVerifySubmit} onResend={handleResendVerify} />
					)}

					{order.buyer && (
						<BuyerInfo
							buyerEmail={order.buyer.email}
							buyerName={order.buyer.name}
							buyerPhone={order.buyer.phone}
						/>
					)}

					<HelpCard contactUrl={contactUrl} />
				</div>
			</div>
		</main>
	);
}
