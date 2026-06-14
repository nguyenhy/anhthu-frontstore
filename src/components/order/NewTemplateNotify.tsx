export default function NewTemplateNotify() {
	return <div className="upsell card">
		<p className="card-title">More templates</p>
		<p style={{ fontSize: "14px", color: "var(--body)" }}>
			Get notified when new templates drop.
		</p>
		<input
			type="email"
			placeholder="Your email"
			style={{
				width: "100%",
				marginTop: "var(--sp-md)",
				border: "1px solid rgba(14,15,12,.2)",
				borderRadius: "var(--r-md)",
				padding: "9px var(--sp-md)",
				fontSize: "14px",
				fontFamily: "var(--font)",
			}}
		/>
		<button
			style={{
				width: "100%",
				marginTop: "var(--sp-sm)",
				background: "var(--primary)",
				color: "var(--ink)",
				fontSize: "14px",
				fontWeight: 600,
				padding: "10px",
				borderRadius: "var(--r-xl)",
			}}
		>
			Notify me
		</button>
	</div>
}