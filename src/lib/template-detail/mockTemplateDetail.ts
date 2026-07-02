import { StrapiTemplateDetail } from "./types";

export const template1_freelancer_invoice_tracker: StrapiTemplateDetail = {
  id: "1",
  slug: "freelancer-invoice-tracker",

  name: "Freelancer Invoice Tracker — Google Sheets Template",
  tagline: "Track every invoice, payment due date, and outstanding balance in one clean sheet. No formulas to set up — just copy and start billing.",
  category: {
    slug: "finance-invoicing",
    name: "Finance & Invoicing",
    emoji: "📊",
  },
  price: 19,
  currency: "USD",
  priceSub: "One-time payment · Yours forever",
  deliveryNote: "Complete your payment — we'll send your Google Sheets link within 24 hours.",
  compatNote: "Built and tested in Google Sheets (free). Works in any browser — no Excel required.",

  metaList: [
    { key: "Format", value: "Google Sheets" },
    { key: "Tabs", value: "3 tabs included" },
    { key: "Formulas", value: "18 pre-built" },
    { key: "Sample data", value: "Pre-filled, easy to clear" },
    { key: "Updates", value: "Free for life" },
  ],

  description: [
    {
      collection: "template_desc_block_feature",
      item: {
        section_title: "What's it does",
        title: "Built for freelancers who hate chasing invoices",
        desc: "Most invoice spreadsheets start clean and go messy fast. This one doesn't. Every row is an invoice: client, amount, due date, status. Totals and overdue counts update automatically as you mark invoices paid. The formula tab shows every calculation in plain language so you understand what's happening — no black-box functions, no locked cells. Sample data comes pre-filled so you can see exactly how the tracker works before you clear it and make it yours. Takes about five minutes to set up for real.",
        features: [
          {
            label: "Auto-calculates total billed, total paid, and outstanding balance",
          },
          { label: "Flags overdue invoices automatically based on due date" },
          {
            label: "Tracks multiple clients in one sheet with per-client subtotals",
          },
          { label: "Currency-agnostic — works in any currency, any locale" },
          { label: "Monthly income summary tab for tax time" },
          { label: "No scripts, no add-ons, no Google Workspace plan needed" },
        ],
      },
    },

    {
      collection: "divider",
    },

    {
      collection: "template_desc_block_card",
      item: {
        section_title: "Who It's For",
        title: "Made for independent workers",
        cards: [
          {
            icon: "💻",
            title: "Freelance developers & designers",
            content: "You send 5–30 invoices a month across several clients and need to know at a glance what's paid and what's overdue.",
          },
          {
            icon: "📝",
            title: "Consultants & coaches",
            content: "You bill by project or retainer, want a clean paper trail, and don't need a full invoicing app with a monthly fee.",
          },
          {
            icon: "📸",
            title: "Photographers & creatives",
            content: "You invoice for gigs, events, and packages. You want something simple that doesn't make tax season a nightmare.",
          },
          {
            icon: "🏪",
            title: "Solo operators & side hustlers",
            content: "You run a lean operation and need to track money in without paying for software you'll only use once a week.",
          },
        ],
        note: "you need to generate and send invoice PDFs directly from your tracker — this is a tracking tool, not an invoice generator.",
        note_icon: "ℹ️",
      },
    },

    {
      collection: "divider",
    },

    {
      collection: "blocks.included-section",
      sectionTitle: "what's Included",
      title: "3 tabs, ready on day one",
      cards: [
        {
          icon: "📋",
          title: "Invoice Log",
          description: "One row per invoice. Client name, invoice number, issue date, due date, amount, and payment status. Conditional formatting highlights overdue rows automatically.",
        },
        {
          icon: "📊",
          title: "Monthly Summary",
          description: "Pulls from the Invoice Log to show total billed, collected, and outstanding per calendar month. Print this for your accountant at tax time.",
        },
        {
          icon: "🔣",
          title: "Formula Reference",
          description: "Every formula used in the template documented in plain English. Understand what's happening before you edit anything. 18 formulas total.",
        },
      ],
    },

    {
      collection: "divider",
    },

    {
      collection: "template_desc_block_faq",
      item: {
        section_title: "Frequently asked",
        title: "Good questions, real answers",
        faqs: [
          {
            question: "How will I receive the template?",
            answer: "After we confirm your payment, we'll send a Google Drive link to your email within 24 hours. Click the link, choose **File → Make a copy** and it lands in your own Drive. You own it permanently — no subscription, no expiry.",
          },
          {
            question: "Does this work with Microsoft Excel?",
            answer: "The template is built and tested in Google Sheets. You can export it to Excel (.xlsx), but some formatting and Google-specific formulas — like ARRAYFORMULA and conditional date rules — may not transfer perfectly. For the best experience, use Google Sheets (free with any Google account).",
          },
          {
            question: "Can I get a refund?",
            answer: "Because digital files are delivered after purchase, we don't offer refunds. If anything in your file doesn't work as described — a broken formula, a missing tab — contact us and we'll fix it same day.",
          },
        ],
      },
    },
  ],

  earlyOffer: {
    section_title: "Early buyer offer",
    title: "Be the first to review. Get 20% off your next template.",
    desc: "Buy now, use the template, and send us your honest review. We'll send a 20% discount code for your next purchase — no minimum, no expiry.",
    note: "We'll email your Drive link within 24 hours. One review request. Unsubscribe anytime.",
    item: {
      submittedMessage: "",
      note: "",
      coupon: {
        code: "DCA129ZW3",
        type: "percent",
        amount: 20,
        currency: "USD",
        cap_value: 20,
        can_expired: false,
        expires_at: undefined,
        active: false,
      },
    },
  },

  galleryTabs: [
    {
      key: "overview",
      label: "Overview Tab — Invoice Log with conditional formatting",
      ariaLabel: "View overview tab screenshot",
      url: "https://picsum.photos/seed/templa-overview/800/500",
      width: "800",
      height: "500",
      type: "image/jpeg",
    },
    {
      key: "formula",
      label: "Formula Reference Tab — 18 formulas explained",
      ariaLabel: "View formula reference tab screenshot",
      url: "https://picsum.photos/seed/templa-overview/800/500",
      width: "800",
      height: "500",
      type: "image/jpeg",
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
