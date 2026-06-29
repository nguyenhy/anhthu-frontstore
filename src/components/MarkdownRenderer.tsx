import './MarkdownRenderer.css'
import clsx from 'clsx'
import { HTMLAttributes } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Props extends HTMLAttributes<HTMLDivElement> {
	content: string
}

export default function MarkdownRenderer({ content, className, ...props }: Props) {
	return (
		<div
			className={clsx('markdown-body', className)}
			{...props}
		>
			<ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
		</div>
	)
}