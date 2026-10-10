import { WhatsAppIcon } from "@/components/icons";
import { SocialLinks } from "@/components/social-links";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { runtimeConfig } from "@/content/runtime";
import type { SiteContent } from "@/types/content";

interface SiteFooterProps {
  site: SiteContent;
}

/**
 * Site footer with the primary contact action and social profiles.
 *
 * REQ-CONTACT-003: the WhatsApp action is reachable from the main contact
 * section. REQ-CONTACT-004: it is discoverable without navigating through
 * unrelated sections, since it appears in the footer on every page.
 * REQ-SOCIAL-001: links to configured social profiles.
 *
 * Server Component: no client-side JavaScript is required for this.
 */
export function SiteFooter({ site }: SiteFooterProps) {
  return (
    <footer className="border-t border-brand-black bg-brand-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10">
        <div id="contacto">
          <h2 className="font-display text-xl text-brand-pink">Contacto</h2>
          <p className="mt-2 max-w-prose text-neutral-200">
            ¿Te gustaría un vestido a medida o tienes una consulta? Escríbeme
            por WhatsApp.
          </p>
        </div>

        <WhatsAppLink
          phone={runtimeConfig.whatsappPhone}
          message="Hola, me interesa un vestido de Habe."
          className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-brand-pink px-6 py-3 font-medium text-brand-black transition-opacity hover:opacity-90"
        >
          <WhatsAppIcon className="size-5" />
          Contactar por WhatsApp
        </WhatsAppLink>

        <SocialLinks
          profiles={site.socialProfiles}
          className="flex flex-wrap items-center gap-5"
        />

        <p className="text-sm text-neutral-400">
          {site.wordmark} — {site.designerName}
        </p>
      </div>
    </footer>
  );
}
