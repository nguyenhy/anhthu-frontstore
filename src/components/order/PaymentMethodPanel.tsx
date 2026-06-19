import type { StrapiPaymentMethod } from "@/lib/payment/types";
import type { BankField } from "./PaymentSection";
import { formatMoney } from "@/lib/formatCurrency";


type AccountSectionProps = {
	fields: BankField[];
	reference: string;
	copiedField: string | null;
	onCopy: (key: string, value: string) => void;
	title?: string;
};

function AccountSection({ fields, reference, copiedField, onCopy, title }: AccountSectionProps) {
	return (
		<div className="pm-panel active">
			{title && <p className="pm-section-title">{title}</p>}
			<div className="bank-detail">
				{fields.map((field) => (
					<div key={field.label} className="bank-row">
						<span className="bank-key">{field.label}</span>
						<div className="bank-val-wrap">
							<span className="bank-val" id={field.copyId}>
								{field.value}
							</span>
							{field.copyId && (
								<button
									className="copy-btn"
									onClick={() => onCopy(field.copyId!, field.value)}
								>
									{copiedField === field.copyId ? "Copied!" : "Copy"}
								</button>
							)}
						</div>
					</div>
				))}
			</div>
			<p className="bank-amount-note">
				Include the reference <strong>{reference}</strong> in your transfer note so we can match your payment.
				{"After transferring, no further action is needed — we'll confirm within 24 hours."}
			</p>
		</div>
	);
}

// --- QR section ---

type QRSectionProps = {
	qrImageUrl: string;
	qrDeeplink?: string;
	title?: string;
};

// qrDeeplink intentionally unused — server-generated deeplink wired at P3
function QRSection({ qrImageUrl, title }: QRSectionProps) {
	return (
		<div className="qr-wrap">
			{title && <p className="pm-section-title">{title}</p>}
			<img src={qrImageUrl} alt="QR code" className="qr-image" />
		</div>
	);
}

// --- Panel ---

export type PaymentMethodPanelProps = {
	method: StrapiPaymentMethod;
	total: number;
	currency: string;
	reference: string;
	copiedField: string | null;
	onCopy: (key: string, value: string) => void;
};

function buildAccountFields(method: StrapiPaymentMethod, total: number, currency: string, reference: string): BankField[] {
	return [
		{ label: "Bank / Provider", value: method.displayName },
		...(method.accountNumber ? [{ label: "Account number", value: method.accountNumber, copyId: "accNum" }] : []),
		...(method.accountName ? [{ label: "Account name", value: method.accountName }] : []),
		{ label: "Amount", value: formatMoney(total, currency), copyId: "payAmount" },
		{ label: "Reference / Note", value: reference, copyId: "payRef" },
	];
}

export function PaymentMethodPanel({ method, total, currency, reference, copiedField, onCopy }: PaymentMethodPanelProps) {

	const hasAccount = !!(method.accountNumber || method.accountName);
	const hasQR = !!method.qrImageUrl;

	const accountSection = hasAccount ? (
		<AccountSection
			fields={buildAccountFields(method, total, currency, reference)}
			reference={reference}
			copiedField={copiedField}
			onCopy={onCopy}
		/>
	) : null;

	const qrSection = hasQR ? (
		<QRSection
			qrImageUrl={method.qrImageUrl!}
			qrDeeplink={method.qrDeeplink}
		/>
	) : null;

	return (
		<div>
			{qrSection}
			{accountSection}
			{method.note && (
				<p className="pm-note">{method.note}</p>
			)}
		</div>
	);
}
