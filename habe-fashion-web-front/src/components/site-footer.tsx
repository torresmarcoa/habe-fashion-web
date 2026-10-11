import { FooterContactRow } from "@/components/footer-contact-row";
import type { SiteContent } from "@/types/content";

interface SiteFooterProps {
  site: SiteContent;
}

/**
 * Site footer with the contact row, social profiles, and credit line.
 *
 * The footer no longer repeats the "Contacto" heading and paragraph: those
 * moved to the homepage call-to-action section, which is the single place a
 * visitor is asked to make contact. The footer keeps the durable contact and
 * profile links (REQ-CONTACT-004, REQ-SOCIAL-001).
 *
 * Server Component: no client-side JavaScript is required for this.
 */
export function SiteFooter({ site }: SiteFooterProps) {
  return (
    <footer className="border-t border-brand-black bg-brand-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10">
        <FooterContactRow site={site} />

        <p className="text-sm text-neutral-400">
          {site.wordmark} — {site.designerName}
        </p>
      </div>
    </footer>
  );
}