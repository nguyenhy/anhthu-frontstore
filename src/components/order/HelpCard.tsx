type Props = { contactUrl: string };

export function HelpCard({ contactUrl }: Props) {
	return (
		<div className="help-card">
			<p className="help-card-title">Need help with your order?</p>
			<p className="help-card-text">
				Send us the order number and we'll sort it out. Replies within 24 hours.
			</p>
			<a
				href={contactUrl}
				style={{
					display: "inline-block",
					marginTop: "var(--sp-xs)",
					fontSize: "14px",
					fontWeight: 600,
					color: "var(--ink)",
					borderBottom: "1.5px solid var(--ink)",
				}}
			>
				Contact support →
			</a>
		</div>
	);
}