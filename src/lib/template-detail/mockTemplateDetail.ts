import { StrapiTemplateDetail } from "./types";

export const template1_freelancer_invoice_tracker: StrapiTemplateDetail = {
  slug: "freelancer-invoice-tracker",

  name: "Freelancer Invoice Tracker — Google Sheets Template",
  tagline:
    "Track every invoice, payment due date, and outstanding balance in one clean sheet. No formulas to set up — just copy and start billing.",
  category: {
    slug: "finance-invoicing",
    name: "Finance & Invoicing",
    emoji: "📊",
  },
  price: 19,
  currency: "USD",
  priceSub: "One-time payment · Yours forever",
  deliveryNote:
    "Complete your payment — we'll send your Google Sheets link within 24 hours.",
  compatNote:
    "Built and tested in Google Sheets (free). Works in any browser — no Excel required.",

  metaList: [
    { key: "Format", value: "Google Sheets" },
    { key: "Tabs", value: "3 tabs included" },
    { key: "Formulas", value: "18 pre-built" },
    { key: "Sample data", value: "Pre-filled, easy to clear" },
    { key: "Updates", value: "Free for life" },
  ],

  description: [
    {
      __component: "blocks.features-section",
      sectionTitle: "What's it does",
      title: "Built for freelancers who hate chasing invoices",
      description: [
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Most invoice spreadsheets start clean and go messy fast. This one doesn't. Every row is an invoice: client, amount, due date, status. Totals and overdue counts update automatically as you mark invoices paid.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "The formula tab shows every calculation in plain language so you understand what's happening — no black-box functions, no locked cells.",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              type: "text",
              text: "Sample data comes pre-filled so you can see exactly how the tracker works before you clear it and make it yours. Takes about five minutes to set up for real.",
            },
          ],
        },
      ],
      features: [
        {
          title:
            "Auto-calculates total billed, total paid, and outstanding balance",
        },
        { title: "Flags overdue invoices automatically based on due date" },
        {
          title:
            "Tracks multiple clients in one sheet with per-client subtotals",
        },
        { title: "Currency-agnostic — works in any currency, any locale" },
        { title: "Monthly income summary tab for tax time" },
        { title: "No scripts, no add-ons, no Google Workspace plan needed" },
      ],
    },

    {
      __component: "divider",
    },

    {
      __component: "blocks.personas-section",
      sectionTitle: "Who It's For",
      title: "Made for independent workers",
      personas: [
        {
          icon: "💻",
          title: "Freelance developers & designers",
          description:
            "You send 5–30 invoices a month across several clients and need to know at a glance what's paid and what's overdue.",
        },
        {
          icon: "📝",
          title: "Consultants & coaches",
          description:
            "You bill by project or retainer, want a clean paper trail, and don't need a full invoicing app with a monthly fee.",
        },
        {
          icon: "📸",
          title: "Photographers & creatives",
          description:
            "You invoice for gigs, events, and packages. You want something simple that doesn't make tax season a nightmare.",
        },
        {
          icon: "🏪",
          title: "Solo operators & side hustlers",
          description:
            "You run a lean operation and need to track money in without paying for software you'll only use once a week.",
        },
      ],
      note: "you need to generate and send invoice PDFs directly from your tracker — this is a tracking tool, not an invoice generator.",
      noteIcon: "ℹ️",
    },

    {
      __component: "divider",
    },

    {
      __component: "blocks.included-section",
      sectionTitle: "what's Included",
      title: "3 tabs, ready on day one",
      cards: [
        {
          icon: "📋",
          title: "Invoice Log",
          description: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "One row per invoice. Client name, invoice number, issue date, due date, amount, and payment status. Conditional formatting highlights overdue rows automatically.",
                },
              ],
            },
          ],
        },
        {
          icon: "📊",
          title: "Monthly Summary",
          description: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Pulls from the Invoice Log to show total billed, collected, and outstanding per calendar month. Print this for your accountant at tax time.",
                },
              ],
            },
          ],
        },
        {
          icon: "🔣",
          title: "Formula Reference",
          description: [
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "Every formula used in the template documented in plain English. Understand what's happening before you edit anything. 18 formulas total.",
                },
              ],
            },
          ],
        },
      ],
    },

    {
      __component: "divider",
    },

    {
      __component: "blocks.faq",
      sectionTitle: "Frequently asked",
      title: "Good questions, real answers",
      faq: [
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
      ],
    },
  ],

  earlyOffer: {
    active: true,
    eyebrow: [
      {
        type: "paragraph",
        children: [{ type: "text", text: "Early buyer offer" }],
      },
    ],
    title: [
      {
        type: "heading",
        level: 2,
        children: [
          { type: "text", text: "Be the first to review. " },
          { type: "text", text: "Get 20% off your next template." },
        ],
      },
    ],
    desc: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Buy now, use the template, and send us your honest review. We'll send a 20% discount code for your next purchase — no minimum, no expiry.",
          },
        ],
      },
    ],
    submittedMessage: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "You're on the list! We'll email your link within 24 hours.",
          },
        ],
      },
    ],
    note: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "We'll email your Drive link within 24 hours. One review request. Unsubscribe anytime.",
          },
        ],
      },
    ],
    coupon: {
      code: "DCA129ZW3",
      type: "percent",
      amount: 20,
      cap: 20,
      condition: "percent-on-next-bill-for-first-review",
      expiresAt: "2099-12-31T00:00:00.000Z",
      active: true,
    },
  },

  galleryTabs: [
    {
      key: "overview",
      label: "Overview Tab — Invoice Log with conditional formatting",
      ariaLabel: "View overview tab screenshot",
      image: { url: "https://picsum.photos/seed/templa-overview/800/500" },
    },
    {
      key: "formula",
      label: "Formula Reference Tab — 18 formulas explained",
      ariaLabel: "View formula reference tab screenshot",
      image: { url: "https://picsum.photos/seed/templa-formula/800/500" },
    },
  ],
};

export const maps: Record<string, StrapiTemplateDetail> = {
  "freelancer-invoice-tracker": template1_freelancer_invoice_tracker,
};

export async function fetchTemplateDetail(
  slug: string,
): Promise<StrapiTemplateDetail | null> {
  return maps[slug] || null;
}
