"use client";

import { useState, useCallback } from "react";
import clsx from "clsx";
import "./VerifyForm.css";

type Props = {
  onSubmit: (code: string) => Promise<string | undefined>;
  onResend: () => Promise<string | undefined>;
};

export function VerifyForm({ onSubmit, onResend }: Props) {
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [errorResend, setErrorResend] = useState("");

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || !code.trim()) return;
    setError("");
    setSubmitting(true);
    try {
      const errorMessage = await onSubmit(code.trim());
      if (errorMessage) setError(errorMessage);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [submitting, code, onSubmit]);

  const handleResend = useCallback(async () => {
    if (resending || submitting) return;
    setErrorResend("");
    setResending(true);
    try {
      const errorMessage = await onResend();
      if (errorMessage) setErrorResend(errorMessage);
    } catch {
      setErrorResend("Something went wrong. Please try again.");
    } finally {
      setResending(false);
    }
  }, [resending, submitting, onResend]);

  return (
    <div className="card">
      <p className="card-title">Verify your email</p>
      <p style={{ fontSize: "13px", color: "var(--mute)", marginBottom: "var(--sp-md)" }}>
        We sent a verification code to your email. Paste it below to continue.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="vf-code">Verification code</label>
          <input
            className={clsx("form-input", error && "error")}
            id="vf-code"
            type="text"
            name="code"
            autoComplete="one-time-code"
            placeholder="••••••"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(""); }}
          />
          {!!error && <p className="field-error visible">{error}</p>}
        </div>

        <button type="submit" className="btn-submit" disabled={submitting || !code.trim()}>
          {submitting ? "Verifying…" : "Verify email →"}
        </button>
        <button type="button" className="btn-resend" disabled={resending || submitting} onClick={handleResend}>
          {resending ? "Resending…" : "Resend email →"}
        </button>
        {!!errorResend && <p className="field-error visible">{errorResend}</p>}
      </form>
    </div>
  );
}
