import { NextRequest, NextResponse } from "next/server";
import { createDraftOrder } from "@/lib/order/createDraftOrder";
import { getRawKey, isObject, isUsableNumber } from "@/lib/validate/extract";
import { createLogger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const logger = createLogger();
  logger.error(req.method, req.url);

  let json: unknown = null;
  try {
    json = await req.json();
  } catch (error) {
    logger.error("json", String(error));
    return NextResponse.json(null, { status: 400 });
  }

  if (!isObject(json)) {
    logger.error("empty_json", json);
    return NextResponse.json(null, { status: 400 });
  }

  const rawId = getRawKey(json, "templateId");
  const id = isUsableNumber(rawId) ? rawId : null;
  if (!id) {
    logger.error("empty_id", rawId);
    return NextResponse.json(null, { status: 400 });
  }

  try {
    const result = await createDraftOrder(id);
    if (result.status === "success") {
      return NextResponse.json({ slug: result.slug });
    }

    logger.error("create_failed", result);
    return NextResponse.json(
      {
        message: result.message ?? "Failed to create order",
        errorId: result.errorId,
      },
      { status: 400 },
    );
  } catch (error) {
    logger.error("create_error", String(error));
    return NextResponse.json(
      {
        message: "Failed to create order",
      },
      { status: 500 },
    );
  }
}
