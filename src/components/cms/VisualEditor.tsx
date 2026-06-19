'use client';

import { useEffect } from 'react';
import { apply } from '@directus/visual-editing';
import { useRouter } from 'next/navigation';


export default function VisualEditor() {
	const router = useRouter();

	useEffect(() => {
		let editorInstance: Awaited<ReturnType<typeof apply>> | null = null;

		const initEditor = async () => {
			const directusUrl = process.env.NEXT_PUBLIC_VISUAL_EDITING_URL || ''
			editorInstance = await apply({
				directusUrl: directusUrl, // Your Directus API URL
				onSaved: () => {
					// Trigger a Next.js router refresh to fetch fresh server data
					router.refresh();
				},
			});
		};

		initEditor();

		// Cleanup on unmount/page navigation
		return () => {
			if (editorInstance && typeof editorInstance.remove === 'function') {
				editorInstance.remove();
			}
		};
	}, [router]);

	return null; // Invisible component
}