import { buildWhatsAppUrl } from "@/lib/contact";

interface WhatsAppLinkProps {
  /** Business number. When absent, a disabled element is rendered instead. */
  phone: string | undefined;
  /** Prefilled message shown in the WhatsApp conversation. */
  message?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * A WhatsApp contact link.
 *
 * Renders nothing actionable when no number is configured, so the site builds
 * and renders before the real number is supplied. The number is read from a
 * public environment variable (REQ-CONTACT-005) and is never hardcoded.
 *
 * REQ-CONTACT-001 and REQ-CONTACT-002: the link opens a conversation with the
 * designer's configured business number.
 *
 * Server Component: no client-side JavaScript is required for this.
 */
export function WhatsAppLink({
  phone,
  message,
  children,
  className,
}: WhatsAppLinkProps) {
  const href = buildWhatsAppUrl(phone, message);

  if (!href) {
    return (
      <span
        aria-disabled="true"
        className={className}
        title="WhatsApp number not configured yet"
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}