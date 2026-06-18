'use client';

import './Faq.css'
import { useState } from 'react';
import clsx from 'clsx';
import { StrapiFaqContent } from '@/lib/template-detail/types';
import MarkdownRenderer from '../MarkdownRenderer';

type FAQProps = {
	items: StrapiFaqContent[];
};

export default function Faq({ items }: FAQProps) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFaq = (index: number) => {
		setOpenIndex(current =>
			current === index ? null : index
		);
	};

	return (
		<ul className="faq-list" role="list">
			{items.map((item, index) => {
				const isOpen = openIndex === index;

				return (
					<li
						key={index}
						className={clsx(
							'faq-item',
							isOpen && 'open'
						)}
					>
						<button
							type="button"
							className="faq-trigger"
							aria-expanded={isOpen}
							onClick={() => toggleFaq(index)}
						>
							<span className="faq-q">
								{item.question}
							</span>

							<span
								className="faq-icon"
								aria-hidden="true"
							>
								{isOpen ? '−' : '+'}
							</span>
						</button>

						<div
							className="faq-body"
							role="region"
							style={{
								maxHeight: isOpen
									? '1000px'
									: '0px',
							}}
						>
							<div className="faq-body-inner">
								<MarkdownRenderer content={item.answer} />
							</div>
						</div>
					</li>
				);
			})}
		</ul>
	);
}