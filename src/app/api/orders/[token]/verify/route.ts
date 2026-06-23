import { NextRequest, NextResponse } from "next/server";
import { fetchFromBff } from "@/lib/fetch";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  try {
    const res = await fetchFromBff(`/api/orders/${token}/verify`, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(new Date().toISOString(), "Verify POST", String(error));
    return NextResponse.json(null, { status: 500 });
  }
}
