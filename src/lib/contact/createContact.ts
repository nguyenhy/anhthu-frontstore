import { ContactFormData } from "./validateContact";
import { ContactError } from "./ContactError";
import { fetchFromBff } from "../fetch";

export interface CreateContactSuccess {
  status: "success";
}

export interface CreateContactError {
  status: "error";
  message?: string;
  errorId?: string;
}

export type CreateContactResult = CreateContactSuccess | CreateContactError;

async function postContact(data: ContactFormData): Promise<void> {
  const res = await fetchFromBff("/api/contact", {
    method: "POST",
    body: JSON.stringify({
      subject: data.subject,
      email: data.email.trim(),
      name: data.name.trim() || undefined,
      message: data.message.trim(),
    }),
  });

  const body = await res.json();

  if (!res.ok) {
    throw new ContactError(body?.message, {
      errorId: body?.errorId,
      statusCode: res.status,
    });
  }
}

export async function createContact(
  data: ContactFormData,
): Promise<CreateContactResult> {
  try {
    await postContact(data);
    return { status: "success" };
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
