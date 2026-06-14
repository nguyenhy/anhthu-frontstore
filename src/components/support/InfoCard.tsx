"use client"
import RichTextRender from "@/components/RichTextRender"
import { StrapiSupportInfoCard } from "@/lib/contact/types"

export type SupportInfoCardProps = {
	cards: StrapiSupportInfoCard[]
}

export default function InfoCard(props: SupportInfoCardProps) {
	return (
		<div className="info-stack">
			{props.cards.map((item, index) => {
				return (
					<div key={index} className="info-card">
						<div className="info-card-icon" aria-hidden="true">{item.icon}</div>
						<div>
							<p className="info-card-title">{item.title}</p>

							<RichTextRender content={item.content} blocks={{
								paragraph: ({ children }) => (
									<p className="info-card-text">{children}</p>
								)
							}} />
							{
								!!item.footnote &&
								(
									<RichTextRender content={item.footnote}
										blocks={{
											paragraph: ({ children }) => (
												<p className="info-card-note">{children}</p>
											)
										}}
									/>
								)
							}
						</div>
					</div>
				)

			})
			}
		</div>
	)
}