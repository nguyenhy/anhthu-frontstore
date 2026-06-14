'use client'
import type { HTMLAttributes } from "react";
import { useCallback } from "react";
import { dispatchOpenDialog } from "./OrderDialog";

type Props = HTMLAttributes<HTMLButtonElement> & {
};

export const GetTemplateBtn = (props: Props) => {
	const handleOrder = useCallback(() => {
		dispatchOpenDialog()
	}, []);
	return (
		<button {...props} onClick={handleOrder} >Get This Template</button>
	)
}