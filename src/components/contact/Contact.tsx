"use client"
import { StrapiContact } from "@/lib/contact/types";
import {
	ContactFormData,
	ContactValidationError,
	getContactErrorMessage,
	validateContact,
} from "@/lib/contact/validateContact";
import { createContact } from "@/lib/contact/createContact";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

export type ContactPreset = {
	subject?: string;
	email?: string;
	message?: string;
};

const UI = {
	sectionLabel: "Contact",
	nameLabel: "Your name",
	namePlaceholder: "e.g. Nguyen Van A",
	emailLabel: "Email address",
	emailPlaceholder: "you@example.com",
	subjectLabel: "Subject",
	subjectPlaceholder: "Choose a topic…",
	messageLabel: "Message",
	messagePlaceholder: "Describe your question or issue…",
	submitText: "Send message →",
} as const;

export type ContactProp = {
	content: StrapiContact;
	preset?: ContactPreset;
};

export default function Contact({ content, preset }: ContactProp) {
	const hasPreset = !!preset;

	const [subject, setSubject] = useState(preset?.subject ?? '');
	const [email, setEmail] = useState(preset?.email ?? '');
	const [name, setName] = useState('');
	const [message, setMessage] = useState(preset?.message ?? '');

	const [emailFocused, setEmailFocused] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	const [subjectError, setSubjectError] = useState('');
	const [emailError, setEmailError] = useState('');
	const [nameError, setNameError] = useState('');
	const [messageError, setMessageError] = useState('');
	const [globalError, setGlobalError] = useState('');

	const showEmail = hasPreset || !!subject;
	const showName = hasPreset || emailFocused;

	const resetFieldErrors = useCallback(() => {
		setSubjectError('');
		setEmailError('');
		setNameError('');
		setMessageError('');
		setGlobalError('');
	}, []);

	const getForm = useCallback<() => ContactFormData>(
		() => ({ subject, email, name, message }),
		[subject, email, name, message]
	);

	const applyErrors = useCallback((errors: ContactValidationError[]) => {
		for (const err of errors) {
			const msg = getContactErrorMessage(err.code);
			if (err.field === 'subject') setSubjectError(msg);
			else if (err.field === 'email') setEmailError(msg);
			else if (err.field === 'name') setNameError(msg);
			else if (err.field === 'message') setMessageError(msg);
		}
	}, []);

	// Re-validate while email is focused
	useEffect(() => {
		if (emailFocused) {
			const errors = validateContact(getForm());
			if (errors.length) {
				applyErrors(errors);
			} else {
				resetFieldErrors();
			}
		}
	}, [emailFocused, subject, email, name, message, getForm, applyErrors, resetFieldErrors]);

	const handleSubmit = useCallback(async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (submitting) return;

		resetFieldErrors();

		const form = getForm();
		const errors = validateContact(form);
		if (errors.length) {
			applyErrors(errors);
			return;
		}

		setSubmitting(true);
		try {
			const result = await createContact(form);
			setSubmitting(false);

			if (result.status === 'success') {
				setSubmitted(true);
			} else {
				setGlobalError(result.message
					? result.message
					: result.errorId
						? `Something went wrong (ref: ${result.errorId}).`
						: 'Something went wrong. Please try again.',
				);
			}
		} catch {
			setGlobalError(
				'Something went wrong. Please try again.',
			)
		} finally {
			setSubmitting(false)
		}
	}, [submitting, getForm, resetFieldErrors, applyErrors]);

	return (
		<div>
			<p className="section-label">
				{UI.sectionLabel}
			</p>

			<h2 className="section-title">
				{content.sectionTitle}
			</h2>

			<div
				className="form-card"
				id="form-card"
				style={{ display: submitted ? 'none' : undefined }}
			>
				<form id="contact-form" onSubmit={handleSubmit} noValidate>

					<div className="form-group">
						<label className="form-label" htmlFor="f-subject">
							{UI.subjectLabel}
						</label>

						<select
							className={clsx('form-select', subjectError && 'invalid')}
							id="f-subject"
							name="subject"
							value={subject}
							onChange={(e) => {
								setSubject(e.target.value);
								setSubjectError('');
							}}
						>
							<option value="" disabled>
								{UI.subjectPlaceholder}
							</option>

							{content.subjects.map((s) => (
								<option key={s.value} value={s.value}>
									{s.label}
								</option>
							))}
						</select>

						{!!subjectError && (
							<p className="field-error visible">{subjectError}</p>
						)}
					</div>

					{showEmail && (
						<div className="form-group">
							<label className="form-label" htmlFor="f-email">
								{UI.emailLabel}
							</label>

							<input
								className={clsx('form-input', emailError && 'invalid')}
								type="email"
								id="f-email"
								name="email"
								placeholder={UI.emailPlaceholder}
								autoComplete="email"
								value={email}
								onFocus={() => setEmailFocused(true)}
								onChange={(e) => {
									setEmail(e.target.value);
									setEmailError('');
								}}
							/>

							{!!emailError && (
								<p className="field-error visible">{emailError}</p>
							)}
						</div>
					)}

					{showName && (
						<div className="form-group">
							<label className="form-label" htmlFor="f-name">
								{UI.nameLabel}
							</label>

							<input
								className={clsx('form-input', nameError && 'invalid')}
								type="text"
								id="f-name"
								name="name"
								placeholder={UI.namePlaceholder}
								autoComplete="name"
								value={name}
								onChange={(e) => {
									setName(e.target.value);
									setNameError('');
								}}
							/>

							{!!nameError && (
								<p className="field-error visible">{nameError}</p>
							)}
						</div>
					)}

					<div className="form-group">
						<label className="form-label" htmlFor="f-message">
							{UI.messageLabel}
						</label>

						<textarea
							className={clsx('form-textarea', messageError && 'invalid')}
							id="f-message"
							name="message"
							placeholder={UI.messagePlaceholder}
							value={message}
							onChange={(e) => {
								setMessage(e.target.value);
								setMessageError('');
							}}
						/>

						{!!messageError && (
							<p className="field-error visible">{messageError}</p>
						)}
					</div>


					{!!globalError && (
						<div className="form-error" role="alert">
							<p>{globalError}</p>
						</div>
					)}

					<button
						type="submit"
						className="btn-submit"
						disabled={submitting}
					>
						{submitting ? 'Sending…' : UI.submitText}
					</button>

				</form>
			</div>

			<div
				className={clsx('confirm-card', submitted && 'visible')}
				id="confirm-card"
				role="alert"
				tabIndex={-1}
			>
				<div className="confirm-icon" aria-hidden="true">
					✓
				</div>

				<p className="confirm-title">
					{content.confirmationTitle}
				</p>

				<p className="confirm-text">
					{content.confirmationText}
				</p>
			</div>
		</div>
	);
}
