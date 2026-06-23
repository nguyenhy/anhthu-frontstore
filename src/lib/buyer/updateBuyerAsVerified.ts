import { fetchFromBff } from "../fetch";

export async function updateBuyerAsVerified(id: string): Promise<void> {
  const res = await fetchFromBff(`/items/buyer?fields=id`, {
    method: "PATCH",
    body: JSON.stringify({
      keys: [id],
      data: {
        verified_at: new Date().toISOString(),
      },
    }),
  });

  if (!res.ok) {
    console.log(
      new Date().toISOString(),
      "updateBuyerAsVerified",
      await res.json(),
    );
    throw new Error(`fetch failed: ${res.status}`);
  }

  console.log(
    new Date().toISOString(),
    "updateBuyerAsVerified",
    await res.json(),
  );
}
