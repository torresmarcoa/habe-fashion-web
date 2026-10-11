import { ContentSection } from "@/components/content-section";
import { ContactCta } from "@/components/contact-cta";
import { Hero } from "@/components/hero";
import { whatContent, whoContent } from "@/content/about";

/**
 * Homepage.
 *
 * Structure, top to bottom: hero banner, "¿Quién soy?" with the image on the
 * right, "¿Qué hago?" with the image on the left, and the closing
 * call-to-action.
 *
 * Every section id matches an entry in `siteContent.navigation`, so
 * REQ-NAV-004 has real targets. The portfolio gallery is not part of this
 * feature; its section arrives with the gallery feature.
 *
 * All copy is placeholder pending designer-supplied content
 * (REQ-CONTENT-001).
 */
export default function HomePage() {
  return (
    <>
      <Hero />

      <ContentSection section={whoContent} />

      <ContentSection section={whatContent} reversed />

      <ContactCta />
    </>
  );
}