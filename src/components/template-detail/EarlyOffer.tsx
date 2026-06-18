'use client'
import './EarlyOffer.css'
import { HTMLAttributes, useCallback, useEffect, useState } from "react";
import RichTextRender from "@/components/RichTextRender";
import clsx from "clsx";
import {
	EMAIL_INVALID,
	EMAIL_REQUIRED,
	getOrderErrorMessage,
} from "@/lib/order/validateOrder";
import { submitEarlyOffer } from "@/lib/template-detail/submitEarlyOffer";
import { EMAIL_REGEX } from "@/lib/contact/validateContact";
import { StrapiEarlyOffer } from '@/lib/template-detail/types';
import MarkdownRenderer from '../MarkdownRenderer';


function validateEmail(email: string): string {
	if (!email || !email.trim()) {
		return getOrderErrorMessage(EMAIL_REQUIRED);
	}

	if (!EMAIL_REGEX.test(email.trim())) {
		return getOrderErrorMessage(EMAIL_INVALID);
	}

	return "";
}

type Props = HTMLAttributes<HTMLDivElement> & {
	offer: StrapiEarlyOffer;
};

export default function EarlyOffer({ offer }: Props) {
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [emailFocused, setEmailFocused] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState<{
		message?: string;
		errorId?: string;
	} | null>(null);

	useEffect(() => {
		if (emailFocused) {
			setEmailError(validateEmail(email));
		}
	}, [emailFocused, email]);

	const handleSubmit = useCallback(
		async (e: React.SubmitEvent<HTMLFormElement>) => {
			e.preventDefault();

			if (submitting) return;

			setError(null);
			const err = validateEmail(email);
			if (err) {
				setEmailError(err);
				return;
			}

			setSubmitting(true);
			try {
				const result = await submitEarlyOffer(email.trim());
				if (result.status === "success") {
					setSubmitted(true);
				} else {
					setError({
						message: result.message,
						errorId: result.errorId,
					});
				}
			} catch {
				setError({ message: "Something went wrong. Please try again." });
			} finally {
				setSubmitting(false);
			}
		},
		[email, submitting],
	);

	return (
		<div className="early-buyer" role="complementary" aria-label="Early buyer offer">
			<div className="early-buyer-text">
				<p className="early-buyer-eyebrow">{offer.section_title}</p>
				<h2 className="early-buyer-title">{offer.title}</h2>
				<MarkdownRenderer className="early-buyer-desc" content={offer.desc} />
			</div>

			<div>
				{submitted ? (
					<p className="early-buyer-success">{"You're on the list! We'll email your link within 24 hours."}</p>
				) : (
					<form onSubmit={handleSubmit} noValidate className="early-buyer-form">
						<input
							className={clsx("early-buyer-input", emailError && "error")}
							type="email"
							id="eb-email"
							name="email"
							placeholder="your@email.com"
							autoComplete="email"
							value={email}
							onFocus={() => setEmailFocused(true)}
							onChange={(e) => {
								setEmail(e.target.value);
								if (emailError) setEmailError("");
							}}
						/>

						{!!emailError && (
							<p className="field-error visible">{emailError}</p>
						)}

						{error && (
							<div className="form-error" role="alert">
								{error.message ? (
									<p>{error.message}</p>
								) : (
									<>
										<p>
											Something went wrong
											{error.errorId ? ` (ref: ${error.errorId})` : ""}.
										</p>
										<a
											href={`/contact${error.errorId ? `?ref=${error.errorId}` : ""}`}
											className="form-error-contact"
										>
											Report issue
										</a>
									</>
								)}
							</div>
						)}

						<button className="btn-early" type="submit" disabled={submitting}>
							{submitting ? "Submitting…" : "Get This Template + Claim Offer"}
						</button>
					</form>
				)}

				{
					<p className="early-fine">{"We'll email your Drive link within 24 hours. One review request. Unsubscribe anytime."}</p>
				}
			</div>
		</div>
	);
}
