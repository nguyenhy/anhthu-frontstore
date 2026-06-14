'use client'

import ErrorPage from '@/components/errors/ErrorPage'
import { parseErrorConfig } from '@/components/errors/ErrorPageParse'

export default function Error({
	error,
	unstable_retry,
}: {
	error: Error & { digest?: string }
	unstable_retry: () => void
}) {
	return (
		<ErrorPage info={parseErrorConfig(error, 500)} reset={unstable_retry} />
	)
}
