"use client"
import { useState } from "react"
import MaterialIcon from "./MaterialIcon"
import "./RatingInput.css"

interface Props {
	value: number
	onChange?: (value: number) => void
	max?: number
	size?: number | string
	readOnly?: boolean
}

// ponytail: round-half-up via Math.round, ties (e.g. .25) round toward next .5
function roundToHalf(value: number) {
	return Math.round(value * 2) / 2
}

function clamp(value: number, max: number) {
	return Math.min(max, Math.max(0, value))
}

function starIcon(index: number, value: number) {
	const diff = value - index
	if (diff >= 1) {
		return { icon: "star", filled: true }
	}
	if (diff >= 0.5) {
		return { icon: "star_half", filled: false }
	}
	return { icon: "star", filled: false }
}

export default function RatingInput({ value, onChange, max = 5, size, readOnly = false }: Props) {
	const [hoverValue, setHoverValue] = useState<number | null>(null)
	const displayValue = clamp(hoverValue ?? value, max)

	function valueFromClick(e: React.MouseEvent<HTMLSpanElement>, index: number) {
		const rect = e.currentTarget.getBoundingClientRect()
		const isLeftHalf = e.clientX - rect.left < rect.width / 2
		return clamp(roundToHalf(index + (isLeftHalf ? 0.5 : 1)), max)
	}

	return (
		<span className="rating-input" role={readOnly ? undefined : "slider"} aria-label={`${displayValue} out of ${max} stars`}>
			{Array.from({ length: max }, (_, index) => {
				const { icon, filled } = starIcon(index, displayValue)
				return (
					<span
						key={index}
						className="rating-input-star"
						onMouseMove={readOnly ? undefined : (e) => setHoverValue(valueFromClick(e, index))}
						onMouseLeave={readOnly ? undefined : () => setHoverValue(null)}
						onClick={readOnly ? undefined : (e) => onChange?.(valueFromClick(e, index))}
					>
						<MaterialIcon icon={icon} filled={filled} size={size} />
					</span>
				)
			})}
		</span>
	)
}
