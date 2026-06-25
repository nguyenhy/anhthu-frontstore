"use client"

import { useState } from "react";

type Props = {
  buyerEmail: string | null;
  buyerName?: string | null;
  buyerPhone?: string | null;
};

function redactEmail(email: string): string {
  const [localPart, domainPart] = email.split("@");
  if (!domainPart) return email;
  const segs = domainPart.split(".");
  const name = segs[0] ?? "";
  const tld = segs.at(-1) ?? "";
  const masked = (name[0] ?? "") + "*".repeat(Math.max(name.length - 1, 4));
  return `${localPart}@${segs.length > 1 ? `${masked}.${tld}` : masked}`;
}

function redactName(name: string): string {
  const parts = name.split(/\s+/);
  const first = parts.shift();
  return [first, ...parts.map((p) => "*".repeat(p.length))].join(" ");
}

function redactPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return `${"*".repeat(Math.max(digits.length - 3, 4))}${digits.slice(-3)}`;
}

type InfoRowProps = {
  label: string;
  value: string;
  redacted: string;
  revealed: boolean;
  onToggle: () => void;
};

function InfoRow({ label, value, redacted, revealed, onToggle }: InfoRowProps) {
  return (
    <div className="info-row">
      <span className="info-key">{label}</span>
      <span className="info-val">{revealed ? value : redacted}</span>
      <button type="button" className="info-toggle" aria-label="Toggle visibility" onClick={onToggle}>
        {revealed ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}

export function BuyerInfo({ buyerEmail, buyerName, buyerPhone }: Props) {
  const [show, setShow] = useState<"name" | "email" | "phone" | null>(null);

  const toggle = (field: "name" | "email" | "phone") =>
    setShow(show === field ? null : field);

  return (
    <div className="card">
      <p className="card-title">Buyer</p>
      <div className="info-list">
        {buyerName && (
          <InfoRow
            label="Name"
            value={buyerName}
            redacted={redactName(buyerName)}
            revealed={show === "name"}
            onToggle={() => toggle("name")}
          />
        )}
        {buyerEmail && (
          <InfoRow
            label="Email"
            value={buyerEmail}
            redacted={redactEmail(buyerEmail)}
            revealed={show === "email"}
            onToggle={() => toggle("email")}
          />
        )}
        {buyerPhone && (
          <InfoRow
            label="Phone"
            value={buyerPhone}
            redacted={redactPhone(buyerPhone)}
            revealed={show === "phone"}
            onToggle={() => toggle("phone")}
          />
        )}
      </div>
    </div>
  );
}
