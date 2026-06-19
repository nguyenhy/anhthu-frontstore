import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props extends HTMLAttributes<HTMLDivElement> {
	content: string
}

export default function MarkdownRenderer({ content, className, ...props }: Props) {
	return (
		<div
			className={clsx(
				'prose max-w-none', className
			)}
			{...props}
		>
			<ReactMarkdown>{content}</ReactMarkdown>
		</div>
	)
}