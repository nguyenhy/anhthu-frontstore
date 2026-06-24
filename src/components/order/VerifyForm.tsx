"use client";

import { useState, useCallback, useEffect } from "react";
import clsx from "clsx";
import "./VerifyForm.css";

type Props = {
  latestResend?: string | null
  cooldownSecs?: number
  onSubmit: (code: string) => Promise<string | undefined>;
  onResend: () => Promise<{ error?: string; retryAfter?: number }>;
};

function initialCooldown(latestResend: string | null | undefined, cooldownSecs: number): number {
  if (!latestResend) return 0;
  const elapsed = Date.now() - new Date(latestResend).getTime();
  return Math.max(0, Math.ceil((cooldownSecs * 1000 - elapsed) / 1000));
}

export function VerifyForm({ latestResend, cooldownSecs = 60, onSubmit, onResend }: Props) {
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [errorResend, setErrorResend] = useState("");
  const [cooldown, setCooldown] = useState(() => initialCooldown(latestResend, cooldownSecs));

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setInterval(() => setCooldown(c => {
      if (c <= 1) { clearInterval(id); return 0; }
      return c - 1;
    }), 1000);
    return () => clearInterval(id);
  }, [cooldown > 0]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || !code.trim()) return;
    setError("");
    setSubmitting(true);
    try {
      const errorMessage = await onSubmit(code.trim());
      if (errorMessage) setError(errorMessage);
      else setCooldown(0);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [submitting, code, onSubmit]);

  const handleResend = useCallback(async () => {
    if (resending || submitting || cooldown > 0) return;
    setErrorResend("");
    setResending(true);
    try {
      const result = await onResend();
      if (result.error) setErrorResend(result.error);
      else setCooldown(result.retryAfter ?? 60);
    } catch {
      setErrorResend("Something went wrong. Please try again.");
    } finally {
      setResending(false);
    }
  }, [resending, submitting, cooldown, onResend]);

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
        <button type="button" className="btn-resend" disabled={resending || submitting || cooldown > 0} onClick={handleResend}>
          {cooldown > 0 ? `Resend in ${cooldown}s` : resending ? "Resending…" : "Resend email →"}
        </button>
        {!!errorResend && <p className="field-error visible">{errorResend}</p>}
      </form>
    </div>
  );
}
