import type { OrderFormData } from "@/components/template-detail/OrderDialog";
import { OrderError } from "./OrderError";
import { fetchFromBff } from "../fetch";

export interface CreateOrderSuccess {
  status: "success";
  token: string;
}

export interface CreateOrderError {
  status: "error";
  message?: string;
  errorId?: string;
}

export type CreateOrderResult = CreateOrderSuccess | CreateOrderError;

/**
 * - error body: { errorId, message }
 * - success body: { token }
 */
async function postOrder(data: OrderFormData): Promise<{ token: string }> {
  const res = await fetchFromBff(`/api/orders`, {
    method: "POST",
    body: JSON.stringify({
      email: data.email.trim(),
      name: data.name?.trim() || undefined,
      phone: data.phone?.trim() || undefined,
    }),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new OrderError(body?.message, {
      errorId: body?.errorId,
      statusCode: res.status,
    });
  }

  return body as { token: string };
}

export async function createOrder(
  data: OrderFormData,
): Promise<CreateOrderResult> {
  try {
    const { token } = await postOrder(data);
    return { status: "success", token };
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
