import { OrderError } from "./OrderError";
import { fetchFromBff } from "../fetch";

export interface CreateDraftOrderSuccess {
  status: "success";
  slug: string;
}

export interface CreateDraftOrderError {
  status: "error";
  message?: string;
  errorId?: string;
}

export type CreateDraftOrderResult =
  | CreateDraftOrderSuccess
  | CreateDraftOrderError;

export async function createDraftOrder(
  templateId: number,
): Promise<CreateDraftOrderResult> {
  try {
    const search = new URLSearchParams();
    search.set("fields", [].join(", "));

    const res = await fetchFromBff(`/frontstore/order/new`, {
      method: "POST",
      body: JSON.stringify({ id: templateId }),
    });

    const json: unknown = await res.json();

    if (!res.ok) {
      const message =
        !!json &&
        typeof json === "object" &&
        "message" in json &&
        typeof json.message === "string"
          ? json.message
          : "";
      const errorId =
        !!json &&
        typeof json === "object" &&
        "errorId" in json &&
        typeof json.errorId === "string"
          ? json.errorId
          : "";
      throw new OrderError(message, {
        errorId: errorId,
        statusCode: res.status,
      });
    }
    const slug =
      !!json &&
      typeof json === "object" &&
      "slug" in json &&
      typeof json.slug === "string"
        ? json.slug
        : null;

    if (slug) {
      return { status: "success", slug: slug };
    }

    return { status: "error" };
  } catch (err) {
    if (err instanceof OrderError) {
      return {
        status: "error",
        message: err.message,
        errorId: err.errorId,
      };
    }
    return { status: "error" };
  }
}
