/**
 * Runtime configuration read from public environment variables.
 *
 * REQ-CONTENT-004 requires business information to be configurable
 * independently from application logic. REQ-SEC-003 restricts this module to
 * values safe for client-side exposure.
 */

const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;

export const runtimeConfig = {
  /**
   * The designer's WhatsApp business number.
   *
   * Undefined or empty means the site builds and renders without a contact
   * link (REQ-CONTACT-005). The real value belongs in an untracked `.env.local`
   * and in the deployment provider's environment settings, never in source
   * control.
   */
  whatsappPhone: whatsappPhone?.trim() || undefined,

  /**
   * Public social profile URLs, configurable without code changes
   * (REQ-SOCIAL-003). Undefined means the profile is omitted from the footer
   * rather than rendered as a dead link.
   */
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || undefined,
  facebookUrl: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || undefined,
};