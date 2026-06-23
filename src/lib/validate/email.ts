import { promises as dns } from "dns";
import { createLogger } from "../logger";
import { isDisposableDomain } from "fakeout";

// Fast O(1) whitelist skip
const WHITELIST_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "live.com",
  "aol.com",
  "zoho.com",
  "proton.me",
  "protonmail.com",
]);

function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms),
  );
}

/**
 * Extracts the domain portion from an email address.
 *
 * Uses `lastIndexOf("@")` to handle quoted `@` in the local part
 * without regex — no ReDoS risk.
 *
 * @returns The lowercased domain, or `null` if the input is not a
 *          structurally valid email address.
 */
export function extractDomain(email: string): string | null {
  const trimmed = email.trim();
  if (trimmed.length === 0) return null;

  const atIndex = trimmed.lastIndexOf("@");
  if (atIndex <= 0 || atIndex === trimmed.length - 1) return null;

  const domain = trimmed.slice(atIndex + 1).toLowerCase();
  if (domain.length === 0) return null;

  const dotIndex = domain.indexOf(".");
  if (dotIndex <= 0 || dotIndex === domain.length - 1) return null;

  return domain;
}

export async function validateEmailDomain(email: string): Promise<boolean> {
  const domain = extractDomain(email);
  if (!domain) return false;

  // 1. Check Blacklist first
  if (isDisposableDomain(domain)) {
    return false;
  }

  // 2. Check Whitelist next
  if (WHITELIST_DOMAINS.has(domain)) {
    return true;
  }

  // Step 2: Fallback to MX lookup for custom domains
  const logger = createLogger();
  logger.info("[mx] >>", domain);
  try {
    const addresses = await Promise.race([
      dns.resolveMx(domain),
      timeout(2000),
    ]);

    logger.info("[mx] <<", addresses);
    return addresses.length > 0;
  } catch (error) {
    logger.error("[mx] xx", String(error));
    return false;
  }
}
