import { runtimeConfig } from "@/content/runtime";
import type { SiteContent } from "@/types/content";

/**
 * Business and navigation content.
 *
 * Placeholder copy: REQ-CONTENT-001 permits placeholder text during
 * development. Replace it with designer-supplied copy before launch
 * (REQ-CONTENT-002). Do not present it as final.
 *
 * Social profiles are intentionally left without URLs. Do not invent
 * profiles (engineering-rules §5.12); add the real ones when the designer
 * supplies them. Unconfigured profiles are omitted from the rendered
 * footer rather than rendered as dead links (REQ-SOCIAL-003).
 */
export const siteContent: SiteContent = {
  name: "Habe",
  wordmark: "HA·BE",
  designerName: "Hannia Farfán",
  tagline: "Vestidos de diseño para ballet, Bodas, Quinceañeras y más",
  description:
    "Portfolio de moda de Hannia Farfán: vestidos de ballet, casuales, de novia, de quinceañera, de graduación y de noche.",
  navigation: [
    { label: "Inicio", href: "#inicio" },
    { label: "¿Quién soy?", href: "#quien-soy" },
    { label: "¿Qué hago?", href: "#que-hago" },
    { label: "Galería", href: "/galeria" },
    { label: "Contacto", href: "#contacto" },
  ],
  socialProfiles: [
    { platform: "instagram", label: "Instagram", url: runtimeConfig.instagramUrl },
    { platform: "facebook", label: "Facebook", url: runtimeConfig.facebookUrl },
    { platform: "youtube", label: "YouTube", url: runtimeConfig.youtubeUrl },
  ],
  socialHandles: {
    instagram: runtimeConfig.instagramHandle,
    facebook: runtimeConfig.facebookHandle,
    youtube: runtimeConfig.youtubeHandle,
  },
};