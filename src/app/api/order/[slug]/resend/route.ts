import { NextRequest, NextResponse } from "next/server";
import { getRawKey, isObject, isString } from "@/lib/validate/extract";
import { createLogger } from "@/lib/logger";
import { updateBuyerAsResendVerify } from "@/lib/buyer/updateBuyerAsResendVerify";
import {
  fetchOrderVerifyBuyer,
  OrderVerifyBuyerData,
} from "@/lib/order/fetchOrderVerifyBuyer";
import { RESEND_COOLDOWN_SECS } from "@/lib/order/resendConfig";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const logger = createLogger();
  logger.info(req.method, req.url);

  const { slug } = await params;

  let body: unknown;
  try {
    const text = await req.text();
    if (text) {
      body = JSON.parse(text);
    }
  } catch (error) {
    logger.info("req.json", String(error));
  }

  const json = isObject(body) ? body : null;
  const rawVersion = json ? getRawKey(json, "version") : "";

  let order: OrderVerifyBuyerData | null;
  try {
    order = await fetchOrderVerifyBuyer(
      slug,
      rawVersion && isString(rawVersion) ? rawVersion : undefined,
    );
  } catch (error) {
    console.error(
      new Date().toISOString(),
      "order_resend.fetchOrderBuyer",
      String(error),
    );
    return NextResponse.json(null, { status: 500 });
  }

  if (!order) {
    console.error(new Date().toISOString(), "order_resend.order_not_found");
    return NextResponse.json(null, { status: 404 });
  }

  if (!order.id) {
    console.error(new Date().toISOString(), "order_resend.order_invalid_id");
    return NextResponse.json(null, { status: 400 });
  }

  if (!order.buyer) {
    console.error(
      new Date().toISOString(),
      "order_resend.order_buyer_not_exist",
    );
    return NextResponse.json(null, { status: 404 });
  }

  if (order.buyer.verified_at) {
    console.error(
      new Date().toISOString(),
      "order_resend.order_buyer_code_mismatch",
    );
    return NextResponse.json(null, { status: 409 });
  }

  const COOLDOWN_MS = RESEND_COOLDOWN_SECS * 1000;

  if (order.buyer.verify_resend_at) {
    const date = new Date(order.buyer.verify_resend_at);
    if (!isNaN(date.valueOf())) {
      console.error(
        new Date().toISOString(),
        "order_resend.order_buyer_resend_invalid",
      );

      const timePassed = Date.now() - date.getTime();
      if (timePassed < COOLDOWN_MS) {
        const secondsRemaining = Math.ceil((COOLDOWN_MS - timePassed) / 1000);
        console.error(
          new Date().toISOString(),
          "order_resend.order_buyer_rate_limited",
          date.toISOString(),
          order.buyer,
        );
        return NextResponse.json(null, {
          status: 429,
          headers: { "Retry-After": String(secondsRemaining) },
        });
      }
    }
  }

  try {
    await updateBuyerAsResendVerify(order.buyer.id);
    return NextResponse.json({}, {
      status: 200,
      headers: { "Retry-After": String(COOLDOWN_MS / 1000) },
    });
  } catch (error) {
    console.error(
      new Date().toISOString(),
      "order_resend.update_error",
      String(error),
    );
    return NextResponse.json(null, { status: 500 });
  }
}
