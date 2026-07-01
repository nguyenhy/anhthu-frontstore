import { findIconDefinition, icon as buildIcon, library } from "@fortawesome/fontawesome-svg-core"
import { fab } from "@fortawesome/free-brands-svg-icons"
import clsx from "clsx"
import { CSSProperties, HTMLAttributes } from "react"
import { socialIcons } from "@/lib/socialIcons"
import "./MaterialIcon.css"

library.add(fab)

/**
 * `size`/`color` are sugar over the --icon-size/--icon-color CSS vars
 * (see MaterialIcon.css). Either set them here, or target them from a
 * parent selector via `className` — both end up setting the same vars.
 */
interface Props extends HTMLAttributes<HTMLSpanElement> {
	icon: string
	filled?: boolean
	/** sets --icon-size. Any CSS length (e.g. 16, "1rem"). Defaults to 24px. */
	size?: number | string
	/** sets --icon-color. Defaults to currentColor */
	color?: string
}

function SocialIcon({ name }: { name: string }) {
	const definition = findIconDefinition({ prefix: "fab", iconName: name as never })
	const rendered = definition ? buildIcon(definition) : null
	const svg = rendered?.abstract?.[0]
	const path = svg?.children?.[0]

	if (!svg || !path) {
		return null
	}

	return (
		<svg
			className="icon-svg"
			viewBox={svg.attributes.viewBox}
			xmlns={svg.attributes.xmlns}
			aria-hidden={svg.attributes["aria-hidden"]}
			focusable={svg.attributes.focusable}
			role={svg.attributes.role}
		>
			<path fill={path.attributes.fill ?? "currentColor"} d={path.attributes.d} />
		</svg>
	)
}

/**
 * Reference: https://github.com/directus/directus/blob/2544b02921b0d3343fff87e527a4788f28153bba/app/src/components/v-icon/v-icon.vue
 * - Any similarity is due to inspiration, not because copy
 */
export default function MaterialIcon({ icon, filled, size, color, className, style, ...props }: Props) {
	const iconStyle: CSSProperties = {
		...style,
		...(size !== undefined && { "--icon-size": typeof size === "number" ? `${size}px` : size }),
		...(color !== undefined && { "--icon-color": color }),
	}

	return (
		<span className={clsx("icon-wrap", className)} style={iconStyle} {...props}>
			{
				socialIcons.includes(icon)
					? <SocialIcon name={icon} />
					: <span data-icon={icon} className={clsx("material-symbol", { filled })} />
			}
		</span>
	)
}
