import { StrapiContactPage } from "./types";

export async function fetchContactPageData(): Promise<StrapiContactPage | null> {
  return {
    contact: {
      sectionTitle: "Send a message",
      subjects: [
        { value: "pre-sale", label: "I have a question before buying" },
        {
          value: "installation",
          label: "I need help with installation or setup",
        },
        { value: "not-working", label: "The template isn't working" },
        { value: "bug-report", label: "I found a bug" },
        { value: "feature-request", label: "I'd like to request a feature" },
        {
          value: "customization",
          label: "I need help customizing the template",
        },
        { value: "refund", label: "I'd like to request a refund" },
        { value: "update", label: "I have a question about updates" },
        {
          value: "documentation",
          label: "I couldn't find the answer in the documentation",
        },
        { value: "other", label: "Other" },
      ],
      confirmationTitle: "Message received",
      confirmationText:
        "Thanks for contacting us! Your request has been received and assigned ticket **#{TICKET_ID}**.\n\nYou can view and track your ticket [**here**]({URL}) at anytime.\n\nOur support team will respond within 1–2 business days (Monday–Friday).",
    },
    faq: [
      {
        question: "How will I receive the template?",
        answer:
          "After we confirm your payment, we'll send a Google Drive link to your email within 24 hours. Click the link, choose **File → Make a copy** and it lands in your own Drive. You own it permanently — no subscription, no expiry.",
      },
      {
        question: "Does this work with Microsoft Excel?",
        answer:
          "The template is built and tested in Google Sheets. You can export it to Excel (.xlsx), but some formatting and Google-specific formulas — like ARRAYFORMULA and conditional date rules — may not transfer perfectly. For the best experience, use Google Sheets (free with any Google account).",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Because digital files are delivered after purchase, we don't offer refunds. If anything in your file doesn't work as described — a broken formula, a missing tab — contact us and we'll fix it same day.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfer and QR code payment. Payment details are shown immediately after you submit your order form.",
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
                  text: "Our support team will review your request and get back to you as soon as possible.",
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
                  url: "mailto:support@support.simplakit.com",
                  children: [{ type: "text", text: "support@support.simplakit.com" }],
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
