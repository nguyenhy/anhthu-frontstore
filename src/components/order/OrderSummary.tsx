import clsx from "clsx";
import { useState } from "react";
import { PricingRow, SummaryPricingRows } from "./useOrderDetail";
import { RawAppliedCoupon } from "@/lib/order/types";

type Props = {
	snapshotName: string;
	snapshotEmoji: string;
	snapshotCategoryName: string;
	pricingRows: SummaryPricingRows;
	appliedCoupon: RawAppliedCoupon | null;
	couponApplying: boolean;
	couponError: string;
	onApplyCoupon: (code: string) => void;
};

export function PricingRowItem(props: { row: PricingRow }) {
	const { row } = props;
	return (
		<div className={clsx("pr-row", row.type === "discount" && "discount", row.type === "total" && "total")}>
			<span className="pr-label">{row.label}</span>
			<span className="pr-val">{row.value}</span>
		</div>
	);
}

export function OrderSummary({
	snapshotName, snapshotEmoji, snapshotCategoryName,
	pricingRows, appliedCoupon, couponApplying, couponError,
	onApplyCoupon,
}: Props) {
	const [couponInput, setCouponInput] = useState("");

	const handleApply = () => {
		onApplyCoupon(couponInput.trim());
		setCouponInput("");
	};

	return (
		<div className="card">
			<p className="card-title">Your order</p>

			<div className="product-row">
				<div className="product-thumb">{snapshotEmoji}</div>
				<div>
					<p className="product-name">{snapshotName}</p>
					<p className="product-meta">{snapshotCategoryName}</p>
				</div>
			</div>

			<div className="pricing-rows">
				<PricingRowItem row={pricingRows.subtotal} />
				{!!pricingRows.discounts && <PricingRowItem row={pricingRows.discounts} />}
				<div className="pr-divider" />
				<PricingRowItem row={pricingRows.total} />
			</div>

			{!appliedCoupon && (
				<div className="coupon-row" id="couponRow">
					<input
						className="coupon-input"
						type="text"
						id="couponInput"
						placeholder="Coupon code"
						value={couponInput}
						onChange={(e) => setCouponInput(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleApply()}
					/>
					<button className="coupon-btn" onClick={handleApply} disabled={couponApplying}>
						{couponApplying ? "…" : "Apply"}
					</button>
				</div>
			)}

			{appliedCoupon && (
				<p className="coupon-msg ok" id="couponOk">Coupon applied — {appliedCoupon.label}</p>
			)}
			{!!couponError && (
				<p className="coupon-msg err" id="couponErr">{couponError}</p>
			)}
		</div>
	);
}
