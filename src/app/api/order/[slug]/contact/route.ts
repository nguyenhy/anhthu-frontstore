import { NextRequest, NextResponse } from "next/server";
import { validateOrder } from "@/lib/order/validateOrder";
import { ContactFormData } from "@/lib/order/types";
import { getRawKey, isObject, isString } from "@/lib/validate/extract";
import { fetchOrderBuyer, OrderBuyerData } from "@/lib/order/fetchOrderBuyer";
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
  const rawVersion = json ? getRawKey(json, "version") : "";
  const form: ContactFormData = {
    email: rawEmail && isString(rawEmail) ? rawEmail : "",
    name: rawName && isString(rawName) ? rawName : "",
    phone: rawPhone && isString(rawPhone) ? rawPhone : "",
  };

  const errors = validateOrder(form);
  if (errors.length) {
    logger.info("validateOrder", json, form, errors);
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

  let orderBuyer: OrderBuyerData | null;
  try {
    orderBuyer = await fetchOrderBuyer(
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

  if (!orderBuyer) {
    console.error(new Date().toISOString(), "contact.patch.not_found");
    return NextResponse.json(null, { status: 404 });
  }

  if (!orderBuyer.id) {
    console.error(new Date().toISOString(), "contact.patch.invalid_id");
    return NextResponse.json(null, { status: 400 });
  }

  if (orderBuyer.buyer) {
    console.error(new Date().toISOString(), "contact.patch.buyer_exist");
    return NextResponse.json(null, { status: 201 });
  }

  try {
    await updateOrderBuyer(orderBuyer.id, form);
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
