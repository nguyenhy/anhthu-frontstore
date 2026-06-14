const ENDPOINT = "/api/early-offer"; // TODO: replace with real endpoint

export type EarlyOfferResult =
  | { status: "success" }
  | { status: "error"; message?: string; errorId?: string };

export async function submitEarlyOffer(email: string): Promise<EarlyOfferResult> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return {
        status: "error",
        message: body?.message,
        errorId: body?.errorId,
      };
    }

    return { status: "success" };
  } catch {
    return { status: "error" };
  }
}
