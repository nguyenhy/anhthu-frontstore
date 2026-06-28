import { NextRequest, NextResponse } from "next/server";
import { createDraftOrder } from "@/lib/order/createDraftOrder";
import { getRawKey, isObject, isString } from "@/lib/validate/extract";
import { createLogger } from "@/lib/logger";
import {
  ContactFormData,
  validateContact,
} from "@/lib/contact/validateContact";
import {
  createSupportTicket,
  CreateSupportTicketProps,
} from "@/lib/support_ticket/createSupportTicket";

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

  const rawSubject = getRawKey(json, "subject");
  const rawEmail = getRawKey(json, "email");
  const rawName = getRawKey(json, "name");
  const rawMessage = getRawKey(json, "message");
  const subject = isString(rawSubject) ? rawSubject : "";
  const email = isString(rawEmail) ? rawEmail : "";
  const name = isString(rawName) ? rawName : "";
  const message = isString(rawMessage) ? rawMessage : "";
  const form: CreateSupportTicketProps = { subject, email, name, message };
  const errors = validateContact(form);
  if (errors.length) {
    logger.info("validateContact", json, form, errors);
    return NextResponse.json({ errors: errors }, { status: 400 });
  }

  try {
    const result = await createSupportTicket(form);
    if (result.status === "success") {
      return NextResponse.json(
        { id: result.data.ticket_id, slug: result.data.slug },
        { status: 200 },
      );
    }

    logger.error("create_failed", result);
    return NextResponse.json(
      {
        message: result.message ?? "Failed to create support ticket",
        errorId: result.errorId,
      },
      { status: 400 },
    );
  } catch (error) {
    logger.error("create_error", String(error));
    return NextResponse.json(
      {
        message: "Failed to create support ticket",
      },
      { status: 500 },
    );
  }
}
