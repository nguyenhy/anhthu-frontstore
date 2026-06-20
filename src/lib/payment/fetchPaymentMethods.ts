import { fetchFromBff } from "../fetch";
import { getImageAssets } from "../image/storage";
import { StrapiPaymentMethod } from "./types";

export async function fetchPaymentMethods(
  version?: string,
): Promise<StrapiPaymentMethod[]> {
  const fields = [
    //
    "name",
    "type",
    "logo",
    "account_name",
    "account_number",
    "logo",
    "note",
  ];
  const search = new URLSearchParams();
  if (version) {
    search.append("version", version);
  }
  search.append("fields", fields.join(","));

  const res = await fetchFromBff(`/items/payment_method?${search.toString()}`);

  if (!res.ok) {
    console.log(
      new Date().toISOString(),
      "fetchPaymentMethods",
      await res.json(),
    );
    throw new Error(`fetch failed: ${res.status}`);
  }

  const json = await res.json();
  const raw = json?.data;

  if (!raw || !Array.isArray(raw)) {
    throw new Error(`payment_method not found`);
  }

  return raw.map(
    (item) =>
      ({
        name: item.name,
        type: item.type,
        accountName: item.account_name,
        accountNumber: item.account_number,
        logo: getImageAssets(item.logo, { height: 400 }),
      }) satisfies StrapiPaymentMethod,
  );
}
