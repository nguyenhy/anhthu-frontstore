import type { ContactFormData } from "@/lib/order/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+\d\s\-().]{7,20}$/;

const NAME_MIN = 2;
const NAME_MAX = 100;
const PHONE_MIN = 7;
const PHONE_MAX = 20;

export const EMAIL_REQUIRED = "EMAIL_REQUIRED" as const;
export const EMAIL_INVALID = "EMAIL_INVALID" as const;
export const NAME_TOO_SHORT = "NAME_TOO_SHORT" as const;
export const NAME_TOO_LONG = "NAME_TOO_LONG" as const;
export const PHONE_INVALID = "PHONE_INVALID" as const;

export type OrderErrorCode =
  | typeof EMAIL_REQUIRED
  | typeof EMAIL_INVALID
  | typeof NAME_TOO_SHORT
  | typeof NAME_TOO_LONG
  | typeof PHONE_INVALID;

const messages: Record<OrderErrorCode, string> = {
  [EMAIL_REQUIRED]: "Email is required.",
  [EMAIL_INVALID]: "Enter a valid email address.",
  [NAME_TOO_SHORT]: `Name must be at least ${NAME_MIN} characters.`,
  [NAME_TOO_LONG]: `Name must be ${NAME_MAX} characters or fewer.`,
  [PHONE_INVALID]: "Enter a valid phone number.",
};

export function getOrderErrorMessage(code: OrderErrorCode): string {
  return messages[code];
}

export interface ValidationError {
  field: keyof ContactFormData;
  code: OrderErrorCode;
}

export function validateOrder(data: ContactFormData): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.email || !data.email.trim()) {
    errors.push({ field: "email", code: EMAIL_REQUIRED });
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.push({ field: "email", code: EMAIL_INVALID });
  }

  if (data.name !== undefined && data.name.trim().length > 0) {
    const len = data.name.trim().length;
    if (len < NAME_MIN) {
      errors.push({ field: "name", code: NAME_TOO_SHORT });
    } else if (len > NAME_MAX) {
      errors.push({ field: "name", code: NAME_TOO_LONG });
    }
  }

  if (data.phone && data.phone.trim().length > 0) {
    const len = data.phone.trim().length;
    if (
      len < PHONE_MIN ||
      len > PHONE_MAX ||
      !PHONE_REGEX.test(data.phone.trim())
    ) {
      errors.push({ field: "phone", code: PHONE_INVALID });
    }
  }

  return errors;
}
