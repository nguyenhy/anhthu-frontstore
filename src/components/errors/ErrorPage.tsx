"use client"

import './ErrorPage.css'
import Link from 'next/link'

type ErrorCode =
	| 400
	| 401
	| 403
	| 404
	| 408
	| 429
	| 500
	| 502
	| 503
	| 504

type ErrorConfig = {
	code: ErrorCode
	variant: 'error' | 'warn' | 'neutral'
	title: string
	desc: string
	actions: {
		label: string
		href?: string
		primary?: boolean
		reload?: boolean
	}[]
}


interface ErrorPageProps {
	info: ErrorConfig,
	reset?: () => void
}

export default function ErrorPage({
	info,
	reset,
}: ErrorPageProps) {


	return (
		<main className="stage">
			<div className="error-card">
				<div
					className="error-code-ring"
					data-variant={info && info.variant !== 'error' ? info.variant : undefined}
				>
					<span className="error-code-number">
						{info.code}
					</span>
				</div>

				<h1 className="error-title">
					{info?.title || ''}
				</h1>

				<p className="error-desc">
					{info?.desc || ''}
				</p>

				<div className="error-actions">
					{(info?.actions || []).map((action) =>
						action.reload ? (
							<button
								key={action.label}
								onClick={() => (reset ? reset() : window.location.reload())}
								className={action.primary ? 'btn-primary' : 'btn-ghost'}
							>
								{action.label}
							</button>
						) : (
							<Link
								key={action.label}
								href={action.href!}
								className={action.primary ? 'btn-primary' : 'btn-ghost'}
							>
								{action.label}
							</Link>
						)
					)}
				</div>
			</div>
		</main>
	)
}