import { OptimizedImage } from "@/components/media";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { heroContent } from "@/content/about";
import { runtimeConfig } from "@/content/runtime";

/**
 * Homepage hero banner.
 *
 * REQ-HERO-001: primary visual asset, headline, supporting text, and a primary
 * call-to-action.
 * REQ-HERO-002: the CTA directs the visitor to contact the designer, one of
 * the two actions the requirement allows.
 * REQ-HERO-003: the visual is delivered through `OptimizedImage`, which adds
 * `f_auto` and `q_auto` for Cloudinary-hosted media.
 * REQ-HERO-004: the section stays understandable if the media cannot load.
 * The neutral fallback block carries the alt text, and the headline is real
 * text rather than baked into an image.
 *
 * REQ-PERF-002: the hero image is the only one marked priority, because it is
 * the sole image in the initial viewport.
 *
 * Server Component: no client-side JavaScript is required for this.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[70svh] w-full"
    >
      <OptimizedImage
        {...heroContent.image}
        fill
        priority
        sizes="100vw"
        className="-z-10 bg-brand-black"
      />

      <div className="mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end px-4 pb-16">
        <h1
          id="hero-heading"
          className="max-w-2xl font-display text-4xl text-brand-pink sm:text-6xl"
        >
          {heroContent.heading}
        </h1>
        <p className="mt-4 max-w-prose text-neutral-200">
          {heroContent.subheading}
        </p>
        <WhatsAppLink
          phone={runtimeConfig.whatsappPhone}
          message="Hola, me interesa un vestido de Habe."
          className="mt-8 inline-flex w-fit cursor-pointer items-center rounded-full bg-brand-pink px-6 py-3 font-medium text-brand-black transition-opacity hover:opacity-90"
        >
          Contactar por WhatsApp
        </WhatsAppLink>
      </div>
    </section>
  );
}