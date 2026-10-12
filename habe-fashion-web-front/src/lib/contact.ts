/**
 * WhatsApp link construction.
 *
 * REQ-CONTACT-002 requires the contact action to use the designer's configured
 * business phone number, and REQ-CONTACT-005 requires that number to be
 * configurable without changing unrelated application logic. The number is
 * read from a public environment variable so it can change without a code
 * change, and it is never committed to source control.
 *
 * Any `NEXT_PUBLIC_*` value is inlined into the client bundle at build time,
 * which is correct here: a business contact number is public information. It
 * must not be used for anything private.
 */

/**
 * Normalizes a phone number to the digits-only format `wa.me` expects.
 *
 * `wa.me` requires a full international number with no `+`, spaces, or
 * separators, and no leading zero on the country code.
 *
 * Returns `null` when the input contains no digits, so callers can distinguish
 * "not configured" from a malformed value.
 */
export function normalizePhoneNumber(raw: string | undefined): string | null {
  if (!raw) {
    return null;
  }

  const digits = raw.replace(/\D/g, "");

  if (digits.length === 0) {
    return null;
  }

  return digits.replace(/^0+/, "");
}

/**
 * Builds the WhatsApp contact URL, or returns `null` when no number is
 * configured.
 *
 * @param phone - The designer's business number, in any common format.
 * @param message - Optional prefilled text.
 */
export function buildWhatsAppUrl(
  phone: string | undefined,
  message?: string,
): string | null {
  const normalized = normalizePhoneNumber(phone);

  if (!normalized) {
    return null;
  }

  const url = new URL(`https://wa.me/${normalized}`);

  if (message) {
    url.searchParams.set("text", message);
  }

  return url.toString();
}