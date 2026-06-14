export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NAME_MIN = 2;
export const NAME_MAX = 100;
export const MESSAGE_MIN = 5;

export const SUBJECT_REQUIRED = 'SUBJECT_REQUIRED' as const;
export const EMAIL_REQUIRED = 'EMAIL_REQUIRED' as const;
export const EMAIL_INVALID = 'EMAIL_INVALID' as const;
export const NAME_TOO_SHORT = 'NAME_TOO_SHORT' as const;
export const NAME_TOO_LONG = 'NAME_TOO_LONG' as const;
export const MESSAGE_REQUIRED = 'MESSAGE_REQUIRED' as const;

export type ContactErrorCode =
	| typeof SUBJECT_REQUIRED
	| typeof EMAIL_REQUIRED
	| typeof EMAIL_INVALID
	| typeof NAME_TOO_SHORT
	| typeof NAME_TOO_LONG
	| typeof MESSAGE_REQUIRED;

export type ContactField = 'subject' | 'email' | 'name' | 'message';

export interface ContactValidationError {
	field: ContactField;
	code: ContactErrorCode;
}

export interface ContactFormData {
	subject: string;
	email: string;
	name: string;
	message: string;
}

const messages: Record<ContactErrorCode, string> = {
	[SUBJECT_REQUIRED]: 'Please select a subject.',
	[EMAIL_REQUIRED]: 'Email is required.',
	[EMAIL_INVALID]: 'Enter a valid email address.',
	[NAME_TOO_SHORT]: `Name must be at least ${NAME_MIN} characters.`,
	[NAME_TOO_LONG]: `Name must be ${NAME_MAX} characters or fewer.`,
	[MESSAGE_REQUIRED]: 'Message is required.',
};

export function getContactErrorMessage(code: ContactErrorCode): string {
	return messages[code];
}

export function validateContact(data: ContactFormData): ContactValidationError[] {
	const errors: ContactValidationError[] = [];

	if (!data.subject) {
		errors.push({ field: 'subject', code: SUBJECT_REQUIRED });
	}

	if (!data.email.trim()) {
		errors.push({ field: 'email', code: EMAIL_REQUIRED });
	} else if (!EMAIL_REGEX.test(data.email.trim())) {
		errors.push({ field: 'email', code: EMAIL_INVALID });
	}

	if (data.name.trim().length > 0) {
		const len = data.name.trim().length;
		if (len < NAME_MIN) {
			errors.push({ field: 'name', code: NAME_TOO_SHORT });
		} else if (len > NAME_MAX) {
			errors.push({ field: 'name', code: NAME_TOO_LONG });
		}
	}

	if (!data.message.trim() || data.message.trim().length < MESSAGE_MIN) {
		errors.push({ field: 'message', code: MESSAGE_REQUIRED });
	}

	return errors;
}
