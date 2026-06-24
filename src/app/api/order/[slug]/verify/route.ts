import { NextRequest, NextResponse } from "next/server";
import { getRawKey, isObject, isString } from "@/lib/validate/extract";
import { isValidVerifyCode } from "@/lib/order/updateOrderBuyer";
import { createLogger } from "@/lib/logger";
import { updateBuyerAsVerified } from "@/lib/buyer/updateBuyerAsVerified";
import {
  fetchOrderVerifyBuyer,
  OrderVerifyBuyerData,
} from "@/lib/order/fetchOrderVerifyBuyer";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const logger = createLogger();
  logger.info(req.method, req.url);

  const { slug } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch (error) {
    logger.info("req.json", String(error));
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const json = isObject(body) ? body : null;
  const rawCode = json ? getRawKey(json, "code") : "";
  const rawVersion = json ? getRawKey(json, "version") : "";

  if (!isValidVerifyCode(rawCode)) {
    return NextResponse.json({ message: "Invalid Code" }, { status: 400 });
  }

  let order: OrderVerifyBuyerData | null;
  try {
    order = await fetchOrderVerifyBuyer(
      slug,
      rawVersion && isString(rawVersion) ? rawVersion : undefined,
    );
  } catch (error) {
    console.error(
      new Date().toISOString(),
      "order_verify.fetchOrderBuyer",
      String(error),
    );
    return NextResponse.json(null, { status: 500 });
  }

  if (!order) {
    console.error(new Date().toISOString(), "order_verify.order_not_found");
    return NextResponse.json(null, { status: 404 });
  }

  if (!order.id) {
    console.error(new Date().toISOString(), "order_verify.order_invalid_id");
    return NextResponse.json(null, { status: 400 });
  }

  if (!order.buyer) {
    console.error(
      new Date().toISOString(),
      "order_verify.order_buyer_not_exist",
    );
    return NextResponse.json(null, { status: 410 });
  }

  if (order.buyer.verified_at) {
    console.error(
      new Date().toISOString(),
      "order_verify.order_buyer_verified",
    );
    return NextResponse.json(null, { status: 201 });
  }

  if (order.buyer.verify_expires_at) {
    const date = new Date(order.buyer.verify_expires_at);
    if (isNaN(date.valueOf())) {
      console.error(
        new Date().toISOString(),
        "order_verify.order_buyer_expires_invalid",
      );
      return NextResponse.json(null, { status: 410 });
    }

    if (Date.now() >= date.valueOf()) {
      console.error(
        new Date().toISOString(),
        "order_verify.order_buyer_expired",
        order.buyer.verify_expires_at,
        new Date().toISOString(),
      );
      return NextResponse.json(null, { status: 410 });
    }
  }

  if (order.buyer.verify_code !== rawCode) {
    console.error(
      new Date().toISOString(),
      "order_verify.order_buyer_code_mismatch",
    );
    return NextResponse.json(null, { status: 201 });
  }

  try {
    await updateBuyerAsVerified(order.buyer.id);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(
      new Date().toISOString(),
      "order_verify.update_error",
      String(error),
    );
    return NextResponse.json(null, { status: 500 });
  }
}
