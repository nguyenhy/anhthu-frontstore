'use client'

import { StrapiDescriptionBlock, StrapiFeaturesSectionBlock, StrapiPersonasSectionBlock, StrapiIncludedSectionBlock, StrapiFaqBlock } from "@/lib/template-detail/types"
import RichTextRender from "@/components/RichTextRender"
import Faq from "./Faq"

export interface TemplateDetailDescriptionProps {
	blocks: StrapiDescriptionBlock[]
}


export default function TemplateDetailDescription(props: TemplateDetailDescriptionProps) {
	return <div>
		{
			props.blocks.map((item, index) => {
				if (item.__component === 'divider') {
					return <div key={index} className="section-divider"></div>

				} else if (item.__component === 'blocks.features-section') {
					return <StrapiFeaturesSectionBlockElement key={index} block={item} />

				} else if (item.__component === 'blocks.personas-section') {
					return <StrapiPersonasSectionBlockElement key={index} block={item} />

				} else if (item.__component === 'blocks.included-section') {
					return <StrapiIncludedSectionBlockElement key={index} block={item} />

				} else if (item.__component === 'blocks.faq') {
					return <StrapiFaqBlockElement key={index} block={item} />

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
			<p className="section-label">{block.sectionTitle}</p>
			<h2 className="section-title">{block.title}</h2>
			<div className="description-grid">
				<div className="description-text">
					<RichTextRender content={block.description} />
				</div>
				<ul className="feature-list" aria-label="Key features">
					{block.features.map((item, index) => (
						<li key={index} className="feature-item">
							<span className="feature-check" aria-hidden="true">✓</span>
							{item.title}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}


export function StrapiPersonasSectionBlockElement({ block }: {
	block: StrapiPersonasSectionBlock
}) {
	return (
		<div>
			<p className="section-label">{block.sectionTitle}</p>
			<h2 className="section-title">{block.title}</h2>
			<div className="persona-grid">
				{block.personas.map((p, i) => (
					<div key={i} className="persona-card">
						<div className="persona-icon">{p.icon}</div>
						<div className="persona-title">{p.title}</div>
						<p className="persona-desc">{p.description}</p>
					</div>
				))}
			</div>
			<div className="exclusion-box">
				<span className="exclusion-icon">{block.noteIcon}</span>
				<span><strong>Not the right fit if</strong> {block.note}</span>
			</div>
		</div>
	)
}

export function StrapiIncludedSectionBlockElement({ block }: {
	block: StrapiIncludedSectionBlock
}) {
	return (
		<div>
			<p className="section-label">{block.sectionTitle}</p>
			<h2 className="section-title">{block.title}</h2>
			<div className="included-grid">
				{block.cards.map((card, i) => (
					<div key={i} className="included-card">
						<div className="included-card-head">
							<div className="included-icon">{card.icon}</div>
							<div className="included-name">{card.title}</div>
						</div>
						<RichTextRender content={card.description} blocks={{
							paragraph: ({ children }) => <p className="included-desc">{children}</p>
						}} />
					</div>
				))}
			</div>
		</div>
	)
}

export function StrapiFaqBlockElement({ block }: {
	block: StrapiFaqBlock
}) {
	return (
		<div>
			<p className="section-label">{block.sectionTitle}</p>
			<h2 className="section-title">{block.title}</h2>
			<Faq items={block.faq} />
		</div>
	)
}
