"use client";

import './ContactForm.css'
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactFormData } from "@/lib/order/types";
import { submitContact } from "@/lib/order/submitContact";
import { validateOrder, getOrderErrorMessage, type ValidationError } from "@/lib/order/validateOrder";

type Props = {
  token: string;
};

export function ContactForm({ token }: Props) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [emailFocused, setEmailFocused] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [globalError, setGlobalError] = useState("");

  const resetFieldErrors = useCallback(() => {
    setEmailError("");
    setNameError("");
    setPhoneError("");
    setGlobalError("");
  }, []);

  const applyErrors = useCallback((errors: ValidationError[]) => {
    for (const err of errors) {
      const msg = getOrderErrorMessage(err.code);
      if (err.field === "email") setEmailError(msg);
      else if (err.field === "name") setNameError(msg);
      else if (err.field === "phone") setPhoneError(msg);
    }
  }, []);

  // Re-validate while email is focused
  useEffect(() => {
    if (!emailFocused) return;
    const errors = validateOrder({ email, name, phone });
    if (errors.length) applyErrors(errors);
    else resetFieldErrors();
  }, [emailFocused, email, name, phone, applyErrors, resetFieldErrors]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    resetFieldErrors();
    const form: ContactFormData = { email, name: name || undefined, phone: phone || undefined };
    const errors = validateOrder(form);
    if (errors.length) {
      applyErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitContact(token, form);
      if (result.status === "success") {
        router.refresh();
      } else {
        setGlobalError(result.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setGlobalError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [submitting, email, name, phone, token, router, resetFieldErrors, applyErrors]);

  return (
    <div className="card">
      <p className="card-title">Your details</p>
      <p style={{ fontSize: "13px", color: "var(--mute)", marginBottom: "var(--sp-md)" }}>
        Fill in your details to see payment instructions.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="cf-email">Email address</label>
          <input
            className={clsx("form-input", emailError && "error")}
            id="cf-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            value={email}
            onFocus={() => setEmailFocused(true)}
            onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
          />
          {!!emailError && <p className="field-error visible">{emailError}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="cf-name">Your name</label>
          <input
            className={clsx("form-input", nameError && "error")}
            id="cf-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => { setName(e.target.value); setNameError(""); }}
          />
          {!!nameError && <p className="field-error visible">{nameError}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="cf-phone">
            Phone number <span style={{ color: "var(--mute)", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            className={clsx("form-input", phoneError && "error")}
            id="cf-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="+1 555 000 0000"
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setPhoneError(""); }}
          />
          {!!phoneError && <p className="field-error visible">{phoneError}</p>}
        </div>

        {!!globalError && (
          <div className="form-error" role="alert">
            <p>{globalError}</p>
          </div>
        )}

        <button type="submit" className="btn-submit" disabled={submitting}>
          {submitting ? "Saving…" : "Continue to payment →"}
        </button>
      </form>
    </div>
  );
}
