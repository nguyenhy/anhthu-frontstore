import { currencyParts } from "@/lib/formatCurrency";
import clsx from "clsx";
import { ReactNode } from "react";


export type FormatCurrencyProps = {
	amount: number,
	currency: string,
	locale?: string,
	currencyClass?: string
	priceClass?: string
}
export default function FormatCurrency(
	props: FormatCurrencyProps
): ReactNode {
	const { amount, currency, currencyClass,
		priceClass } = props
	const money = currencyParts(amount, currency);

	return (
		<>
			{money.symbolPosition === "prefix" && (
				<span className={clsx("currency", currencyClass)}>{money.symbol}</span >
			)
			}

			<span className={clsx(priceClass)}>{money.value}</span>

			{
				money.symbolPosition === "suffix" && (
					<span className={clsx("currency", currencyClass)}>{money.symbol}</ span>
				)}
		</>
	);
}