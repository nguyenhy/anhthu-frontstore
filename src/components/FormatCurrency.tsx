import { currencyParts } from "@/lib/formatCurrency";
import { ReactNode } from "react";


export type FormatCurrencyProps = {
	amount: number,
	currency: string,
	locale?: string,
}
export default function FormatCurrency(
	props: FormatCurrencyProps
): ReactNode {
	const { amount, currency, locale } = props
	const money = currencyParts(amount, currency, locale);

	return (
		<>
			{money.symbolPosition === "prefix" && (
				<span className="currency">{money.symbol}</span>
			)}

			<span>{money.value}</span>

			{money.symbolPosition === "suffix" && (
				<span className="currency">{money.symbol}</span>
			)}
		</>
	);
}