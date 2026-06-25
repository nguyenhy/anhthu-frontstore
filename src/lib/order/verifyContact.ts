import type { ContactFormData } from "@/lib/order/types";
import { OrderError } from "./OrderError";

export interface VerifyContactSuccess {
  status: "success";
}

export interface VerifyContactError {
  status: "error";
  message?: string;
  errorId?: string;
}

export type VerifyContactResult = VerifyContactSuccess | VerifyContactError;

export async function verifyContact(
  slug: string,
  code: string,
): Promise<VerifyContactResult> {
  try {
    const res = await fetch(`/api/order/${slug}/verify`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: code.trim(),
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
