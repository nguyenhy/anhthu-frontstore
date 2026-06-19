/**
 * Canonical Strapi content-type shapes for the frontend.
 *
 * THIS FILE IS THE SOURCE OF TRUTH.
 * Every type here mirrors a Strapi collection or single type exactly.
 * When the CMS schema changes, update here first — the compiler will
 * surface every consumer that needs to follow.
 *
 * Rules:
 * - Only raw Strapi response shapes live here (prefix: Strapi*)
 * - Frontend display/computed types stay in their lib files
 * - Fields are readonly — never mutate a Strapi response
 */

import type { RichText } from "@/components/RichTextRender";

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

type HTMLString = string;
type MarkdownString = string;

/** `{ key, value }` pair used in template meta lists. */
export type StrapiMetaItem = {
  readonly key: string;
  readonly value: string;
};

/** Single feature bullet inside a features-section block. */
export type StrapiFeatureItem = {
  readonly label: string;
};

/** Card entry inside an included-section block. */
export type StrapiIncludedCard = {
  readonly icon: string;
  readonly title: string;
  readonly description: RichText;
};

/** Single FAQ entry — shared across template and contact pages. */
export type StrapiFaqContent = {
  readonly question: string;
  readonly answer: MarkdownString;
};

/** Strapi media object. Only `url` is guaranteed at P0. */
export type StrapiMedia = {
  readonly url: string;
};

// ---------------------------------------------------------------------------
// Category (Collection)
// ---------------------------------------------------------------------------

/** Template category. Keyed by `slug` in CATEGORY_CONFIG on the frontend. */
export type StrapiCategory = {
  readonly slug: string;
  readonly name: string;
  /** Single emoji character shown next to the category name. */
  readonly emoji: string;
};

// ---------------------------------------------------------------------------
// Persona (Collection)
// ---------------------------------------------------------------------------

/** Reusable buyer persona shown in personas-section blocks. */
export type StrapiPersona = {
  readonly icon: string;
  readonly title: string;
  readonly content: string;
};

// ---------------------------------------------------------------------------
// Faq (Collection)
// ---------------------------------------------------------------------------

/** Standalone FAQ entry. `shared: true` = site-wide; `false` = template-specific. */
export type StrapiFaq = {
  readonly label: string;
  readonly content: RichText;
  readonly shared: boolean;
};

// ---------------------------------------------------------------------------
// Coupon (Collection)
// ---------------------------------------------------------------------------

/** Discount coupon. `type` determines how `amount` is applied. */
export type StrapiCoupon = {
  readonly code: string;
  /** `percent` = percentage off; `fixed` = flat amount off in currency. */
  readonly type: "percent" | "fixed";
  readonly amount: number;
  readonly currency: string;
  /** Maximum discount cap in currency units. Only relevant for `percent` type. */
  readonly cap_value: number;
  /** Human-readable condition text shown to buyer. */
  readonly can_expired: boolean;
  readonly expires_at?: string | null; // ISO 8601
  readonly active: boolean;
};

// ---------------------------------------------------------------------------
// EarlyOffer (Collection)
// ---------------------------------------------------------------------------

/** Promotional offer widget shown on the template detail page. Requires a linked Coupon. */
export type StrapiEarlyOffer = {
  readonly section_title: string;
  readonly title: string;
  readonly desc: MarkdownString;
  readonly note: MarkdownString;
  readonly item: {
    /** Message shown after buyer submits the early offer form. */
    readonly submittedMessage: RichText;
    readonly note: RichText;
    readonly coupon: StrapiCoupon;
  };
};

// ---------------------------------------------------------------------------
// PaymentInstruction (Collection)
// ---------------------------------------------------------------------------

/** Supported payment method categories. */
export type StrapiPaymentMethodType = "bank" | "ewallet";

/**
 * Payment method shown on the order page.
 * Fetched from `/api/payment-instructions`.
 */
export type StrapiPaymentMethod = {
  /** Human-readable name shown to buyer. Example: `"Vietcombank"`, `"MoMo"`. */
  readonly name: string;
  readonly type: StrapiPaymentMethodType;
  /** Logo or brand image. */
  readonly logo?: unknown;
  /** Bank account number, wallet ID, or phone number receiving payments. */
  readonly accountNumber: string;
  /** Registered account holder name. */
  readonly accountName: string;
  /** URL of a static QR image for scanning. */
  readonly qrImageUrl?: string;
  /** Deep link to open the payment app directly. Example: `"momo://..."`. */
  readonly qrDeeplink?: string;
  /** Additional instructions shown to buyer. */
  readonly note?: string;
  /** Display order — lower values shown first. */
  readonly sortOrder?: number;
};

// ---------------------------------------------------------------------------
// Template — dynamic zone blocks
// ---------------------------------------------------------------------------

export type StrapiDividerSectionBlock = {
  readonly collection: "divider";
};

export type StrapiFeaturesSectionBlock = {
  readonly collection: "template_desc_block_feature";
  readonly item: {
    readonly section_title: string;
    readonly title: string;
    readonly desc: HTMLString;
    readonly features: StrapiFeatureItem[];
  };
};

export type StrapiPersonasSectionBlock = {
  readonly collection: "template_desc_block_card";
  readonly item: {
    readonly section_title: string;
    readonly title: string;
    readonly cards: StrapiPersona[];
    readonly note: string;
    readonly note_icon: string;
  };
};

export type StrapiIncludedSectionBlock = {
  readonly collection: "blocks.included-section";
  readonly sectionTitle: string;
  readonly title: string;
  readonly cards: StrapiIncludedCard[];
};

export type StrapiRichTextBlock = {
  readonly collection: "blocks.rich-text";
  readonly sectionTitle: string;
  readonly content: RichText;
};

export type StrapiFaqBlock = {
  readonly collection: "template_desc_block_faq";
  readonly item: {
    readonly section_title: string;
    readonly title: string;
    readonly faqs: StrapiFaqContent[];
  };
};

/** Union of all dynamic zone block types in Template.description. */
export type StrapiDescriptionBlock =
  | StrapiDividerSectionBlock
  | StrapiFeaturesSectionBlock
  | StrapiPersonasSectionBlock
  | StrapiIncludedSectionBlock
  | StrapiFaqBlock
  | StrapiRichTextBlock;

// ---------------------------------------------------------------------------
// Template (Collection)
// ---------------------------------------------------------------------------

/** Single image tab in the template gallery. */
export type StrapiGalleryTab = {
  readonly key: string;
  readonly label: string;
  readonly ariaLabel: string;
  // readonly filename_disk: string;
  // readonly filename_download: string;
  readonly url: string;
  readonly width: string;
  readonly height: string;
  readonly type: string;
};

/**
 * Template product record.
 * `driveLink` is excluded from the public API — never present on the frontend.
 */
export type StrapiTemplateDetail = {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly category: StrapiCategory;
  readonly tagline: string;
  readonly price: number;
  readonly currency: string;
  /** Pricing subtitle shown below the price. */
  readonly priceSub: string;
  /** Delivery expectation copy shown on the template page. */
  readonly deliveryNote: string;
  /** Compatibility note shown on the template page. */
  readonly compatNote: string;
  readonly metaList: StrapiMetaItem[];
  readonly galleryTabs: StrapiGalleryTab[];
  readonly description: StrapiDescriptionBlock[];
  /** Promotional offer widget. Null if no active offer. */
  readonly earlyOffer: StrapiEarlyOffer | null;
};

// ---------------------------------------------------------------------------
// Order — status enums
// ---------------------------------------------------------------------------

/** All possible order lifecycle statuses. Mirrors `OrderEvent.status` enum in Strapi. */
export type StrapiOrderStatus =
  | "pending"
  | "payment_confirmed"
  | "delivered"
  | "expired"
  | "disputed"
  | "completed";

/** Who triggered the order event. */
export type StrapiOrderActor = "admin" | "system" | "buyer";

// ---------------------------------------------------------------------------
// OrderEvent (Collection)
// ---------------------------------------------------------------------------

/**
 * Append-only status event. Immutable after creation.
 * `correction: true` is required for backward status transitions.
 */
export type StrapiOrderEvent = {
  readonly id: string;
  readonly status: StrapiOrderStatus;
  readonly occurredAt: string; // ISO 8601
  readonly note?: string;
  readonly actor: StrapiOrderActor;
  /** True when this event reverses a previous status (admin correction). */
  readonly correction: boolean;
};

// ---------------------------------------------------------------------------
// Order (Collection)
// ---------------------------------------------------------------------------

/**
 * Coupon snapshot written once at order creation.
 * Preserves discount terms even if the coupon is later modified or deleted.
 */
export type StrapiCouponSnapshot = {
  readonly code: string;
  readonly type: "percent" | "fixed";
  readonly amount: number;
  readonly cap?: number;
};

/**
 * Order record returned by `GET /api/orders/:token`.
 * Snapshot fields (`snapshot*`) capture template state at purchase time and never change.
 * `status` is a read cache of the latest `OrderEvent.status` — never written directly.
 */
export type StrapiOrderDetail = {
  readonly token: string;
  readonly orderNumber: string;
  /** Read cache of latest OrderEvent.status. Never write directly. */
  readonly status: StrapiOrderStatus;
  readonly createdAt: string | null; // ISO 8601
  /** Payment deadline. Assigned at order creation, always present. */
  readonly deadlineAt: string | null; // ISO 8601

  /** Null on draft orders (contact not yet submitted). */
  readonly buyerEmail: string | null;
  readonly buyerName?: string | null;
  readonly buyerPhone?: string | null;

  /** Template name at purchase time. */
  readonly templateName: string;
  readonly templateSlug: string;
  /** Currency code at purchase time. Example: `"VND"`. */
  readonly currency: string;
  /** Category emoji at purchase time. */
  readonly thumbnail: StrapiGalleryTab;
  /** Category name at purchase time. */
  readonly category: StrapiCategory;

  readonly subtotal: number;
  readonly discount: number;
  readonly total: number;

  /** Applied coupon snapshot. Null if no coupon was used. */
  readonly coupon?: StrapiCouponSnapshot | null;
  readonly timeline: StrapiOrderEvent[];
};

// ---------------------------------------------------------------------------
// Contact (Single type)
// ---------------------------------------------------------------------------

/** Subject option in the contact form dropdown. */
export type StrapiContactSubject = {
  readonly value: string;
  readonly label: string;
};

/** Contact single type — drives the contact form UI. */
export type StrapiContact = {
  readonly sectionTitle: string;
  readonly subjects: StrapiContactSubject[];
  readonly confirmationTitle: string;
  readonly confirmationText: string;
};

// ---------------------------------------------------------------------------
// Support (Single type)
// ---------------------------------------------------------------------------

/** Hero section at the top of the support page. */
export type StrapiSupportHero = {
  readonly eyebrow: string;
  readonly headline: string;
  readonly subtext: string;
};

/** Individual info card on the support page. */
export type StrapiSupportInfoCard = {
  readonly icon: string;
  readonly title: string;
  readonly content: RichText;
  readonly footnote?: RichText;
};

/** Support single type — drives the support page UI. */
export type StrapiSupport = {
  readonly hero: StrapiSupportHero;
  readonly infoCards: StrapiSupportInfoCard[];
};

// ---------------------------------------------------------------------------
// ContactPage aggregator
// ---------------------------------------------------------------------------

/**
 * Combined payload for the contact page — assembled from one `populate=deep` fetch.
 * Not a standalone Strapi content type; fields mirror CMS shapes.
 */
export type StrapiContactPage = {
  readonly faq: StrapiFaqContent[];
  readonly contact: StrapiContact;
  readonly support: StrapiSupport;
};
