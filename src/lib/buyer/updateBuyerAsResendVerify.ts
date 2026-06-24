import { randomInt } from "node:crypto";
import { fetchFromBff } from "../fetch";

export async function updateBuyerAsResendVerify(id: string): Promise<void> {
  const code = randomInt(100000, 999999).toString();
  const today = new Date();
  const res = await fetchFromBff(`/items/buyer?fields=id`, {
    method: "PATCH",
    body: JSON.stringify({
      keys: [id],
      data: {
        verify_code: code,
        verify_expires_at: new Date(
          today.valueOf() + 15 * 60 * 1000,
        ).toISOString(),
        verify_resend_at: today.toISOString(),
      },
    }),
  });

  if (!res.ok) {
    console.log(
      new Date().toISOString(),
      "updateBuyerAsResendVerify.fail",
      JSON.stringify(await res.json()),
    );
    throw new Error(`fetch failed: ${res.status}`);
  }

  console.log(
    new Date().toISOString(),
    "updateBuyerAsResendVerify.ok",
    JSON.stringify(await res.json()),
  );
}
