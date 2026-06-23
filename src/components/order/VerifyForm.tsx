"use client";

import { useState, useCallback } from "react";
import clsx from "clsx";
import "./ContactForm.css";

type Props = {
  onSubmit: (code: string) => Promise<string | undefined>;
};

export function VerifyForm({ onSubmit }: Props) {
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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
      </form>
    </div>
  );
}
