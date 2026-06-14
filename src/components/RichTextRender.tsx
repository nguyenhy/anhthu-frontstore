import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

export type RichText = BlocksContent;
export type RichTextRenderProps = Parameters<typeof BlocksRenderer>[0]

export default function RichTextRender(props: RichTextRenderProps) {
	return (
		<BlocksRenderer {...props} />
	)
}