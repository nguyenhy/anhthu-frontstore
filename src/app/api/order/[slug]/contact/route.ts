import { NextRequest, NextResponse } from "next/server";
import { validateOrder } from "@/lib/order/validateOrder";
import { ContactFormData } from "@/lib/order/types";
import { getRawKey, isObject, isString } from "@/lib/validate/extract";
import { updateOrderBuyer } from "@/lib/order/updateOrderBuyer";
import { validateEmailDomain } from "@/lib/validate/email";
import { EMAIL_INVALID } from "@/lib/contact/validateContact";
import { createLogger } from "@/lib/logger";

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
  const rawEmail = json ? getRawKey(json, "email") : "";
  const rawName = json ? getRawKey(json, "name") : "";
  const rawPhone = json ? getRawKey(json, "phone") : "";
  const form: ContactFormData = {
    email: rawEmail && isString(rawEmail) ? rawEmail : "",
    name: rawName && isString(rawName) ? rawName : "",
    phone: rawPhone && isString(rawPhone) ? rawPhone : "",
  };

  const errors = validateOrder(form);
  if (errors.length) {
    logger.info("validateOrder", errors);
    return NextResponse.json({ errors: errors }, { status: 400 });
  }

  const valid = await validateEmailDomain(form.email);
  if (!valid) {
    logger.info("validateEmailDomain");
    return NextResponse.json(
      { errors: [{ field: "email", code: EMAIL_INVALID }] },
      { status: 400 },
    );
  }

  try {
    const { status } = await updateOrderBuyer(slug, form);
    return NextResponse.json(status === 200 ? {} : null, { status });
  } catch (error) {
    logger.error("contact.patch.error", String(error));
    return NextResponse.json(null, { status: 500 });
  }
}
