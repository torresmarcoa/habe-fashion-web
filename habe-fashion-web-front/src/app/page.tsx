import { ContentSection } from "@/components/content-section";
import { ContactCta } from "@/components/contact-cta";
import { Hero } from "@/components/hero";
import { HomeGallery } from "@/components/home-gallery";
import { whatContent, whoContent } from "@/content/about";

/**
 * Homepage.
 *
 * Structure, top to bottom: hero banner, "¿Quién soy?" with the image on the
 * right, "¿Qué hago?" with the image on the left, a gallery teaser linking to
 * `/galeria`, and the closing call-to-action.
 *
 * Section ids match the anchor entries in `siteContent.navigation`, so
 * REQ-NAV-004 has real targets. The gallery itself is a separate route.
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

      <HomeGallery />

      <ContactCta />
    </>
  );
}