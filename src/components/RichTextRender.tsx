import { type HTMLAttributes } from "react";

export type HTMLString = string;
export interface RichTextRenderProps extends HTMLAttributes<HTMLDivElement> {
	content: HTMLString
}

export default function RichTextRender(props: RichTextRenderProps) {
	const { content, dangerouslySetInnerHTML: _dangerouslySetInnerHTML, ...args } = props
	return (
		<div {...args} dangerouslySetInnerHTML={{
			__html: content
		}}></div>
	)
}