import clsx from "clsx"
import { HTMLAttributes } from "react"

interface Props extends HTMLAttributes<HTMLSpanElement> {
	icon: string
}

export default function MaterialIcon({ icon, className, ...props }: Props) {
	return (
		<span
			className={clsx(
				'material-icons', className
			)}
			{...props}
		>
			{icon}
		</span>
	)
}