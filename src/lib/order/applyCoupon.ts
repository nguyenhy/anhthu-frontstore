import { fetchFromBff } from "../fetch";
import { RawAppliedCoupon } from "./types";
import { OrderError } from "./OrderError";

export interface ApplyCouponSuccess {
  status: "success";
  coupon: RawAppliedCoupon;
  total: number; // server-recomputed total after coupon
}

export interface ApplyCouponError {
  status: "error";
  message: string;
  errorId?: string;
}

export type ApplyCouponResult = ApplyCouponSuccess | ApplyCouponError;

export async function applyCoupon(
  token: string,
  code: string,
): Promise<ApplyCouponResult> {
  try {
    const res = await fetchFromBff(`/api/order/${token}/coupons`, {
      method: "POST",
      body: JSON.stringify({ code: code.trim().toUpperCase() }),
    });

    const body = await res.json();

    if (!res.ok) {
      throw new OrderError(body?.message ?? "Coupon not valid", {
        errorId: body?.errorId,
        statusCode: res.status,
      });
    }

    return {
      status: "success",
      coupon: body.coupon as RawAppliedCoupon,
      total: body.total as number,
    };
  } catch (err) {
    if (err instanceof OrderError) {
      return { status: "error", message: err.message, errorId: err.errorId };
    }
    return { status: "error", message: "Something went wrong. Try again." };
  }
}
