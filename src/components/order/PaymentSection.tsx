"use client"

import clsx from "clsx";
import { useEffect, useState } from "react";
import type { StrapiPaymentMethod } from "@/lib/payment/types";
import { PaymentMethodPanel } from "./PaymentMethodPanel";
import { DeadlineWarning } from "./DeadlineWarning";

export type BankField = {
	label: string;
	value: string;
	copyId?: string;
};

type Props = {
	paymentMethods: StrapiPaymentMethod[];
	total: number;
	currency: string;
	copiedField: string | null;
	onCopy: (key: string, value: string) => void;
	reference: string;
	deadlineAt: string;
};

export function PaymentSection({
	paymentMethods,
	total,
	currency,
	copiedField, onCopy,
	reference, deadlineAt,
}: Props) {
	const active = paymentMethods
		.toSorted((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

	const [activeTab, setActiveTab] = useState(1);

	useEffect(() => {
		if (!activeTab) {
			setActiveTab(1);
		}
	}, [activeTab]);

	const current = active.find((_, index) => index + 1 === activeTab) ?? active[0];

	if (active.length === 0) {
		return (
			<div className="card" id="paymentSection">
				<p className="card-title">Payment</p>
				<p className="pm-unavailable">No payment methods available. Please contact us for assistance.</p>
			</div>
		);
	}

	return (
		<div className="card" id="paymentSection">
			<p className="card-title">Payment</p>

			<DeadlineWarning deadlineAt={deadlineAt} />

			{active.length > 1 && (
				<div className="payment-method-tabs">
					{active.map((m, index) => (
						<div
							key={index}
							className={clsx("pm-tab", activeTab === index + 1 && "active")}
							onClick={() => setActiveTab(index + 1)}
						>
							{m.name}
						</div>
					))}
				</div>
			)}

			{current && (
				<PaymentMethodPanel
					method={current}
					total={total}
					currency={currency}
					reference={reference}
					copiedField={copiedField}
					onCopy={onCopy}
				/>
			)}
		</div>
	);
}
