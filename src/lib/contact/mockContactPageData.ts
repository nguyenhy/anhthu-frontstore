import { StrapiContactPage } from "./types";

export async function fetchContactPageData(): Promise<StrapiContactPage | null> {
  return {
    contact: {
      sectionTitle: "Send a message",
      subjects: [
        { value: "pre-sale", label: "I have a question before buying" },
        { value: "refund", label: "I'd like a refund" },
        { value: "not-working", label: "The template isn't working" },
        { value: "other", label: "Other" },
      ],
      confirmationTitle: "Message received",
      confirmationText: "We'll reply within 1–2 business days, Monday–Friday.",
    },
    faq: [
      {
        label: "How delivery works?",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Complete your payment — we'll send your Google Sheets link within 24 hours",
              },
            ],
          },
        ],
      },
      {
        label: "How will I receive the template?",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "After we confirm your payment, we'll send a Google Drive link to your email within 24 hours. Click the link, choose ",
              },
              { type: "text", text: "File → Make a copy", bold: true },
              {
                type: "text",
                text: " and it lands in your own Drive. You own it permanently — no subscription, no expiry.",
              },
            ],
          },
        ],
      },
      {
        label: "Does this work with Microsoft Excel?",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "The template is built and tested in Google Sheets. You can export it to Excel (.xlsx), but some formatting and Google-specific formulas — like ARRAYFORMULA and conditional date rules — may not transfer perfectly. For the best experience, use Google Sheets (free with any Google account).",
              },
            ],
          },
        ],
      },
      {
        label: "Can I get a refund?",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Because digital files are delivered after purchase, we don't offer refunds. If anything in your file doesn't work as described — a broken formula, a missing tab — contact us and we'll fix it same day.",
              },
            ],
          },
        ],
      },
      {
        label: "What payment methods do you accept?",
        content: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "We accept bank transfer and QR code payment. Payment details are shown immediately after you submit your order form.",
              },
            ],
          },
        ],
      },
    ],
    support: {
      hero: {
        eyebrow: "Support",
        headline: "How can we help?",
        subtext:
          "Check the FAQ below — most answers live there. If not, send us a message and we'll reply within 1–2 business days.",
      },
      infoCards: [
        {
          icon: "🕐",
          title: "Response time",
          content: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "We typically reply within 1–2 business days, Monday–Friday.",
                },
              ],
            },
          ],
        },
        {
          icon: "✉️",
          title: "Email us directly",
          content: [
            {
              type: "paragraph",
              children: [
                { type: "text", text: "Write to " },
                {
                  type: "link",
                  url: "mailto:support@simplavn.com",
                  children: [{ type: "text", text: "support@simplavn.com" }],
                },
              ],
            },
          ],
          footnote: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Lost your order link? Email us with your name and we'll recover it for you.",
                },
              ],
            },
          ],
        },
      ],
    },
  };
}
