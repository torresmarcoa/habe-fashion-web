import { WhatsAppIcon } from "@/components/icons";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { contactCtaContent } from "@/content/about";
import { runtimeConfig } from "@/content/runtime";

/**
 * Closing call-to-action for the homepage.
 *
 * REQ-CONTACT-006: a visitor interested in a personalized or custom-made
 * dress is directed to WhatsApp, which is how the product specification says
 * custom orders are handled during the MVP.
 * REQ-CONTACT-001 and REQ-CONTACT-005: the action uses the configured
 * business number and degrades gracefully when none is set.
 *
 * Server Component: no client-side JavaScript is required for this.
 */
export function ContactCta() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="mx-auto max-w-6xl px-4 py-20 text-center"
    >
      <h2
        id="contacto-heading"
        className="font-display text-4xl text-brand-pink sm:text-5xl"
      >
        {contactCtaContent.heading}
      </h2>
      <p className="mx-auto mt-4 max-w-prose">{contactCtaContent.body}</p>
      <WhatsAppLink
        phone={runtimeConfig.whatsappPhone}
        message={contactCtaContent.buttonMessage}
        className="mt-8 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-brand-black px-8 py-4 font-medium text-brand-pink transition-opacity hover:opacity-90"
      >
        <WhatsAppIcon className="size-5" />
        {contactCtaContent.buttonLabel}
      </WhatsAppLink>
    </section>
  );
}