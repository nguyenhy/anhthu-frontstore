import { randomInt } from "node:crypto";
import { fetchFromBff } from "../fetch";
import { isString, isUsableNumber } from "../validate/extract";

export type UpdateOrderBuyerData = {
  readonly id: string;
};

export const createVerifyCode = () => {
  return randomInt(100000, 999999).toString();
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
  id: string,
  buyer: {
    email: string;
    name?: string;
    phone?: string;
  },
): Promise<void> {
  const code = randomInt(100000, 999999).toString();
  const res = await fetchFromBff(`/items/order?fields=id`, {
    method: "PATCH",
    body: JSON.stringify({
      keys: [id],
      data: {
        buyer: {
          email: buyer.email,
          name: buyer.name,
          phone: buyer.phone,
          verify_code: code,
          verify_expires_at: new Date(
            Date.now() + 15 * 60 * 1000,
          ).toISOString(),
        },
      },
    }),
  });

  if (!res.ok) {
    console.log(new Date().toISOString(), "updateOrderBuyer", await res.json());
    throw new Error(`fetch failed: ${res.status}`);
  }
}
