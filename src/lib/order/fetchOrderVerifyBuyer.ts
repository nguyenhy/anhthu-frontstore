import { fetchFromBff } from "../fetch";

export type OrderVerifyBuyerData = {
  readonly id: string;
  readonly slug: string;

  readonly buyer: {
    readonly id: string;
    readonly verify_code: string;
    readonly verified_at: string | null;
    readonly verify_expires_at: string | null;
    readonly verify_resend_at: string | null;
  } | null;
};

export async function fetchOrderVerifyBuyer(
  slug: string,
  version?: string,
): Promise<OrderVerifyBuyerData | null> {
  const search = new URLSearchParams();
  if (version) search.append("version", version);

  const query = search.toString();
  const res = await fetchFromBff(
    `/frontstore/order/${slug}/verify-buyer${query ? `?${query}` : ""}`,
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);

  const json = await res.json();
  if (!json) return null;

  return {
    id: json.id,
    slug: json.slug,
    buyer: json.buyer
      ? {
          id: json.buyer.id,
          verify_code: json.buyer.verify_code,
          verified_at: json.buyer.verified_at ?? null,
          verify_expires_at: json.buyer.verify_expires_at ?? null,
          verify_resend_at: json.buyer.verify_resend_at ?? null,
        }
      : null,
  } satisfies OrderVerifyBuyerData;
}
