import { fetchFromBff } from "../fetch";

export async function updateBuyerAsResendVerify(id: string): Promise<void> {
  const res = await fetchFromBff(`/frontstore/buyer/${id}/resend`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
}
