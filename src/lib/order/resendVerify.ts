import { OrderError } from "./OrderError";

export interface ResendVerifySuccess {
  status: "success";
  retryAfter?: number;
}

export interface ResendVerifyError {
  status: "error";
  message?: string;
  errorId?: string;
}

export type ResendVerifyResult = ResendVerifySuccess | ResendVerifyError;

export async function resendVerify(slug: string): Promise<ResendVerifyResult> {
  try {
    const res = await fetch(`/api/order/${slug}/resend`, {
      method: "PATCH",
    });

    const body = await res.json();

    if (!res.ok) {
      throw new OrderError(body?.message, {
        errorId: body?.errorId,
        statusCode: res.status,
      });
    }

    const retryAfter = Number(res.headers.get("Retry-After")) || undefined;
    return { status: "success", retryAfter };
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
