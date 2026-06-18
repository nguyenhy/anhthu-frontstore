export type CurrencyParts = {
  formatted: string;
  value: string;
  symbol: string;
  symbolPosition: "prefix" | "suffix";
  parts: Intl.NumberFormatPart[];
};

const currencyLocales = {
  VND: "vi-VN",
  USD: "en-US",
  EUR: "de-DE",
  GBP: "en-GB",
  JPY: "ja-JP",
} as const;

export type SupportedCurrency = keyof typeof currencyLocales;

export function currencyParts(
  amount: number,
  currency: SupportedCurrency,
): CurrencyParts {
  const locale = currencyLocales[currency];

  const parts = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).formatToParts(amount);

  const symbol = parts.find((p) => p.type === "currency")?.value ?? currency;
  const currencyIndex = parts.findIndex((p) => p.type === "currency");
  const integerIndex = parts.findIndex(
    (p) => p.type === "integer" || p.type === "fraction",
  );

  return {
    formatted: parts.map((p) => p.value).join(""),
    value: parts
      .filter((p) => p.type !== "currency" && p.type !== "literal")
      .map((p) => p.value)
      .join(""),
    symbol,
    symbolPosition: currencyIndex < integerIndex ? "prefix" : "suffix",
    parts,
  };
}

/**
 * @todo remove hard code convert as unknown as SupportedCurrency
 */
export function formatMoney(
  amount: number,
  currency: string,
): string {
  return currencyParts(amount, currency as unknown as SupportedCurrency).formatted;
}
