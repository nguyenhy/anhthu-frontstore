import { useCallback, useEffect, useRef, useState } from "react";

import { getTimeRemaining, TimeRemaining } from "@/lib/formatDate";

type Props = {
	deadlineAt: string;
};

export function DeadlineWarning({ deadlineAt }: Props) {
	const [remaining, setRemaining] = useState(() =>
		getTimeRemaining(deadlineAt, Date.now()),
	);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	useEffect(() => {
		const tick = () => {
			const next = getTimeRemaining(deadlineAt, Date.now());
			setRemaining(next);
			if (next === null && intervalRef.current !== null) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};

		const onVisible = () => {
			if (document.visibilityState === "visible") tick();
		};

		tick();
		intervalRef.current = setInterval(tick, 1_000);
		document.addEventListener("visibilitychange", onVisible);

		return () => {
			if (intervalRef.current !== null) clearInterval(intervalRef.current);
			document.removeEventListener("visibilitychange", onVisible);
		};
	}, [deadlineAt]);


	/**
	 * Formats a countdown into a human-readable string.
	 *
	 * Examples:
	 * - 2d 3h 15m 8s
	 * - 3h 15m 8s
	 * - 15m 8s
	 * - 8s
	 */
	const formatTimeRemaining = useCallback((remaining: TimeRemaining) => {
		const parts: string[] = [];

		if (remaining.days > 0) {
			parts.push(`${remaining.days}d`);
		}

		if (remaining.days > 0 || remaining.hours > 0) {
			parts.push(`${remaining.hours}h`);
		}

		if (remaining.days > 0 || remaining.hours > 0 || remaining.minutes > 0) {
			parts.push(`${remaining.minutes}m`);
		}

		parts.push(`${remaining.seconds}s`);

		return parts.join(" ");
	}, [])

	return (
		<div
			className="deadline-box"
			style={{ marginBottom: "var(--sp-xl)" }}
		>
			<span className="deadline-icon">⚠️</span>

			<p className="deadline-text">
				Pay before deadline:{" "}
				<strong suppressHydrationWarning>
					{
						remaining === null
							? "Expired"
							: formatTimeRemaining(remaining)
					}
				</strong>
			</p>
		</div>
	);
}