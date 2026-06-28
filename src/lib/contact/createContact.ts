import { ContactFormData } from "./validateContact";
import { ContactError } from "./ContactError";
import { fetchFromBff } from "../fetch";

export interface CreateContactSuccess {
  status: "success";
  data: { id: string; slug: string };
}

export interface CreateContactError {
  status: "error";
  message?: string;
  errorId?: string;
}

export type CreateContactResult = CreateContactSuccess | CreateContactError;

async function postContact(
  data: ContactFormData,
): Promise<{ id: string; slug: string }> {
  const res = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify({
      subject: data.subject || "",
      email: (data.email || "").trim(),
      name: (data.name || "").trim() || undefined,
      message: (data.message || "").trim(),
    }),
  });

  const body = await res.json();
  if (!res.ok) {
    throw new ContactError(body?.message, {
      errorId: body?.errorId,
      statusCode: res.status,
    });
  }

  return body;
}

export async function createContact(
  data: ContactFormData,
): Promise<CreateContactResult> {
  try {
    const result = await postContact(data);
    return { status: "success", data: result };
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
