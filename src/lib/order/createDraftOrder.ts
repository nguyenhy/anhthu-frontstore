import { OrderError } from "./OrderError";
import { fetchFromBff } from "../fetch";

export interface CreateDraftOrderSuccess {
  status: "success";
  token: string;
}

export interface CreateDraftOrderError {
  status: "error";
  message?: string;
  errorId?: string;
}

export type CreateDraftOrderResult = CreateDraftOrderSuccess | CreateDraftOrderError;

export async function createDraftOrder(
  templateId: string,
): Promise<CreateDraftOrderResult> {
  try {
    const res = await fetchFromBff(`/api/orders`, {
      method: "POST",
      body: JSON.stringify({ templateId }),
    });

    const body = await res.json();

    if (!res.ok) {
      throw new OrderError(body?.message, {
        errorId: body?.errorId,
        statusCode: res.status,
      });
    }

    return { status: "success", token: (body as { token: string }).token };
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
