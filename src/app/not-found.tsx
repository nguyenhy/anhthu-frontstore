'use client'

import ErrorPage from '@/components/errors/ErrorPage'
import { parseErrorConfig } from '@/components/errors/ErrorPageParse'

export default function NotFound() {
	return (
		<ErrorPage info={parseErrorConfig(undefined, 404)} />
	)
}