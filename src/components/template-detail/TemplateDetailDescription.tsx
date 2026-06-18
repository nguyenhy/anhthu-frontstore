'use client'

import { StrapiDescriptionBlock, StrapiFeaturesSectionBlock, StrapiPersonasSectionBlock, StrapiFaqBlock } from "@/lib/template-detail/types"
import RichTextRender from "@/components/RichTextRender"
import Faq from "./Faq"
import MaterialIcon from "../MaterialIcon"
import MarkdownRenderer from "../MarkdownRenderer"

export interface TemplateDetailDescriptionProps {
	blocks: StrapiDescriptionBlock[]
}


export default function TemplateDetailDescription(props: TemplateDetailDescriptionProps) {
	return <div>
		{
			(props.blocks || []).map((item, index) => {
				if (item.collection === 'template_desc_block_feature') {
					return (
						<StrapiFeaturesSectionBlockElement key={index} block={item} />
					)

				} else if (item.collection === 'template_desc_block_card') {
					return item.item.note ?
						(
							<StrapiPersonasSectionBlockElement key={index} block={item} />
						)
						: (
							<StrapiIncludedSectionBlockElement key={index} block={item} />
						)

				} else if (item.collection === 'template_desc_block_faq') {
					return (
						<StrapiFaqBlockElement key={index} block={item} />
					)
				}

				return null
			})
		}
	</div>
}


export function StrapiFeaturesSectionBlockElement({ block }: {
	block: StrapiFeaturesSectionBlock
}) {
	return (
		<div>
			<p className="section-label">{block.item.section_title}</p>
			<h2 className="section-title">{block.item.title}</h2>
			<div className="description-grid">
				<div className="description-text" dangerouslySetInnerHTML={{
					__html: block.item.desc
				}}>
				</div>
				<ul className="feature-list" aria-label="Key features">
					{block.item.features.map((item, index) => (
						<li key={index} className="feature-item">
							<span className="feature-check" aria-hidden="true">✓</span>
							{item.label}
						</li>
					))}
				</ul>
			</div>
			<div className="section-divider"></div>
		</div>
	)
}


export function StrapiPersonasSectionBlockElement({ block }: {
	block: StrapiPersonasSectionBlock
}) {
	return (
		<div>
			<p className="section-label">{block.item.section_title}</p>
			<h2 className="section-title">{block.item.title}</h2>
			<div className="persona-grid">
				{block.item.cards.map((p, i) => (
					<div key={i} className="persona-card">
						<MaterialIcon className="persona-icon" icon={p.icon} />
						<div className="persona-title">{p.title}</div>
						<MarkdownRenderer className="persona-desc" content={p.content} />
					</div>
				))}
			</div>
			{
				!!block.item.note && (
					<div className="exclusion-box">
						<MaterialIcon className="exclusion-icon" icon={block.item.note_icon} />
						<MarkdownRenderer content={block.item.note} />
					</div>
				)
			}
			<div className="section-divider"></div>
		</div>
	)
}

export function StrapiIncludedSectionBlockElement({ block }: {
	block: StrapiPersonasSectionBlock
}) {
	return (
		<div>
			<p className="section-label">{block.item.section_title}</p>
			<h2 className="section-title">{block.item.title}</h2>
			<div className="included-grid">
				{block.item.cards.map((card, i) => (
					<div key={i} className="included-card">
						<div className="included-card-head">
							<MaterialIcon className="included-icon" icon={card.icon} />
							<div className="included-name">{card.title}</div>
						</div>
						<MarkdownRenderer className="included-desc" content={card.content} />
					</div>
				))}
			</div>
			<div className="section-divider"></div>
		</div>
	)
}

export function StrapiFaqBlockElement({ block }: {
	block: StrapiFaqBlock
}) {
	return (
		<div>
			<p className="section-label">{block.item.section_title}</p>
			<h2 className="section-title">{block.item.title}</h2>
			<Faq items={block.item.faqs} />
			<div className="section-divider"></div>
		</div>
	)
}
