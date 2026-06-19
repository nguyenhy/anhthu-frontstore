import type { ContactFormData } from "@/lib/order/types";
import { OrderError } from "./OrderError";
import { fetchFromBff } from "../fetch";

export interface SubmitContactSuccess {
  status: "success";
}

export interface SubmitContactError {
  status: "error";
  message?: string;
  errorId?: string;
}

export type SubmitContactResult = SubmitContactSuccess | SubmitContactError;

export async function submitContact(
  token: string,
  data: ContactFormData,
): Promise<SubmitContactResult> {
  try {
    const res = await fetchFromBff(`/api/orders/${token}/contact`, {
      method: "PATCH",
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

    return { status: "success" };
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
