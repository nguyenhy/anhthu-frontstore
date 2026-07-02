"use client"
import { StrapiSupportInfoCard } from "@/lib/contact/types"
import MarkdownRenderer from "../MarkdownRenderer"

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

							<div className="info-card-text">
								<MarkdownRenderer content={item.content} />
							</div>
							{
								!!item.footnote &&
								(
									<div className="info-card-note">
										<MarkdownRenderer content={item.footnote} />
									</div>
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