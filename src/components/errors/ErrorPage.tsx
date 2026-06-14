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

const ERRORS: Record<ErrorCode, ErrorConfig> = {
	400: {
		code: 400,
		variant: 'error',
		title: 'Bad request',
		desc: 'The request was malformed or missing required information. Check the URL and try again.',
		actions: [
			{ label: 'Go back', reload: true, primary: true },
			{ label: 'Back to home', href: '/' },
		],
	},
	401: {
		code: 401,
		variant: 'error',
		title: 'Sign in required',
		desc: 'You need to sign in to access this page.',
		actions: [
			{ label: 'Sign in', href: '/contact', primary: true },
			{ label: 'Back to home', href: '/' },
		],
	},
	403: {
		code: 403,
		variant: 'warn',
		title: 'Access denied',
		desc: "You don't have permission to view this page. If you think this is a mistake, contact support.",
		actions: [
			{ label: 'Contact support', href: '/contact', primary: true },
			{ label: 'Back to home', href: '/' },
		],
	},
	404: {
		code: 404,
		variant: 'neutral',
		title: 'Page not found',
		desc: "The page you're looking for doesn't exist or may have been moved.",
		actions: [
			{ label: 'Browse templates', href: '/templates', primary: true },
			{ label: 'Back to home', href: '/' },
		],
	},
	408: {
		code: 408,
		variant: 'warn',
		title: 'Request timed out',
		desc: 'The server took too long to respond. Check your connection and try again.',
		actions: [
			{ label: 'Try again', reload: true, primary: true },
			{ label: 'Back to home', href: '/' },
		],
	},
	429: {
		code: 429,
		variant: 'warn',
		title: 'Too many requests',
		desc: "You've made too many requests in a short period. Wait a moment, then try again.",
		actions: [
			{ label: 'Try again', reload: true, primary: true },
			{ label: 'Back to home', href: '/' },
		],
	},
	500: {
		code: 500,
		variant: 'error',
		title: 'Something went wrong',
		desc: 'An unexpected error occurred on our end. Try refreshing the page, or come back in a few minutes.',
		actions: [
			{ label: 'Try again', reload: true, primary: true },
			{ label: 'Back to home', href: '/' },
		],
	},
	502: {
		code: 502,
		variant: 'error',
		title: 'Bad gateway',
		desc: "We're having trouble connecting to our servers. Please try again shortly.",
		actions: [
			{ label: 'Try again', reload: true, primary: true },
			{ label: 'Contact support', href: '/contact' },
		],
	},
	503: {
		code: 503,
		variant: 'warn',
		title: 'Service unavailable',
		desc: "We're temporarily down for maintenance. We'll be back shortly.",
		actions: [
			{ label: 'Try again', reload: true, primary: true },
			{ label: 'Contact support', href: '/contact' },
		],
	},
	504: {
		code: 504,
		variant: 'error',
		title: 'Gateway timeout',
		desc: "The server didn't respond in time. Check your connection and try again.",
		actions: [
			{ label: 'Try again', reload: true, primary: true },
			{ label: 'Back to home', href: '/' },
		],
	},
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