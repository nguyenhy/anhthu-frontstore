import { fetchFromBff } from "../fetch";

export async function updateBuyerAsVerified(id: string): Promise<void> {
  const res = await fetchFromBff(`/frontstore/buyer/${id}/verify`, {
    method: "PATCH",
  });

  if (!res.ok) throw new Error(`fetch failed: ${res.status}`);
}
