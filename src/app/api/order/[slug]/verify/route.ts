import { NextRequest, NextResponse } from "next/server";
import { getRawKey, isObject, isString } from "@/lib/validate/extract";
import { fetchOrderBuyer, OrderBuyerData } from "@/lib/order/fetchOrderBuyer";
import { isValidVerifyCode } from "@/lib/order/updateOrderBuyer";
import { createLogger } from "@/lib/logger";
import { updateBuyerAsVerified } from "@/lib/buyer/verifyBuyer";

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

  let order: OrderBuyerData | null;
  try {
    order = await fetchOrderBuyer(
      slug,
      rawVersion && isString(rawVersion) ? rawVersion : undefined,
    );
  } catch (error) {
    console.error(
      new Date().toISOString(),
      "contact.patch.fetchOrderBuyer",
      String(error),
    );
    return NextResponse.json(null, { status: 500 });
  }

  if (!order) {
    console.error(new Date().toISOString(), "contact.patch.order_not_found");
    return NextResponse.json(null, { status: 404 });
  }

  if (!order.id) {
    console.error(new Date().toISOString(), "contact.patch.order_invalid_id");
    return NextResponse.json(null, { status: 400 });
  }

  if (!order.buyer) {
    console.error(new Date().toISOString(), "contact.patch.order_buyer_not_exist");
    return NextResponse.json(null, { status: 201 });
  }

  try {
    await updateBuyerAsVerified(order.buyer.id);
    return NextResponse.json({}, { status: 200 });
  } catch (error) {
    console.error(
      new Date().toISOString(),
      "contact.patch.update_error",
      String(error),
    );
    return NextResponse.json(null, { status: 500 });
  }
}
