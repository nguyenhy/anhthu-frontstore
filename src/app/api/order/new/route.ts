import { NextRequest, NextResponse } from "next/server";
import { createDraftOrder } from "@/lib/order/createDraftOrder";

export async function POST(req: NextRequest) {
  let templateId: string | undefined;
  try {
    const body = await req.json();
    templateId = typeof body?.templateId === "string" ? body.templateId : undefined;
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  if (!templateId) {
    return NextResponse.json({ message: "templateId required" }, { status: 400 });
  }

  const result = await createDraftOrder(templateId);

  if (result.status === "success") {
    return NextResponse.json({ slug: result.slug });
  }

  return NextResponse.json(
    { message: result.message ?? "Failed to create order", errorId: result.errorId },
    { status: 500 },
  );
}
