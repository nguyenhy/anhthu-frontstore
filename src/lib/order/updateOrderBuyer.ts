import { fetchFromBff } from "../fetch";
import { isString, isUsableNumber } from "../validate/extract";

export type UpdateOrderBuyerData = {
  readonly id: string;
};

export const isValidVerifyCode = (code: unknown) => {
  return (
    isString(code) &&
    isUsableNumber(+code) &&
    +code >= 100000 &&
    +code <= 999999
  );
};

export async function updateOrderBuyer(
  slug: string,
  buyer: {
    email: string;
    name?: string;
    phone?: string;
  },
): Promise<{ status: number }> {
  const res = await fetchFromBff(`/frontstore/order/${slug}/contact`, {
    method: "PATCH",
    body: JSON.stringify({
      email: buyer.email,
      name: buyer.name,
      phone: buyer.phone,
    }),
  });

  if (res.status === 404 || res.status === 201 || res.status === 200) {
    return { status: res.status };
  }

  throw new Error(`fetch failed: ${res.status}`);
}
