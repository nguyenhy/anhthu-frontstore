import { ContactError } from "../contact/ContactError";
import { fetchFromBff } from "../fetch";
import { getRawKey, isObject, isString } from "../validate/extract";

export type CreateSupportTicketProps = {
  subject: string;
  email: string;
  name?: string;
  message?: string;
};

export interface CreateSupportTicketSuccess {
  status: "success";
  data: {
    ticket_id: string;
    slug: string;
  };
}

export interface CreateSupportTicketError {
  status: "error";
  message?: string;
  errorId?: string;
}

export type CreateSupportTicketResult =
  | CreateSupportTicketSuccess
  | CreateSupportTicketError;

export async function postSupportTicket(
  data: CreateSupportTicketProps,
): Promise<unknown> {
  const res = await fetchFromBff(`/frontstore/support_ticket/new`, {
    method: "POST",
    body: JSON.stringify({
      subject: data.subject,
      email: data.email.trim(),
      name: (data.name || "").trim(),
      message: (data.message || "").trim(),
    }),
  });

  if (!res.ok) {
    throw new ContactError("can't create support ticket", {
      errorId: undefined,
      statusCode: res.status,
    });
  }

  const text = await res.text();
  const json = text ? JSON.parse(text) : null;

  return json;
}

export async function createSupportTicket(
  data: CreateSupportTicketProps,
): Promise<CreateSupportTicketResult> {
  try {
    const result = await postSupportTicket(data);
    const json = !!result && isObject(result) ? result : null;
    const rawId = getRawKey(json, "ticket_id");
    const rawSlug = getRawKey(json, "slug");
    const ticket_id = rawId && isString(rawId) ? rawId : "";
    const slug = rawSlug && isString(rawSlug) ? rawSlug : "";

    return { status: "success", data: { ticket_id, slug } };
  } catch (err) {
    if (err instanceof ContactError) {
      return {
        status: "error",
        message: err.message,
        errorId: err.errorId,
      };
    }
    return { status: "error" };
  }
}
