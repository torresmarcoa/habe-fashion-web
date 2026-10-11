/**
 * Copy for the homepage sections.
 *
 * Every string here is PLACEHOLDER pending designer-supplied content
 * (REQ-CONTENT-001). Nothing in this file describes Hannia Farfán as a
 * person, and no claim about her work, training, or clients is asserted.
 * Replace it with real copy before launch (REQ-CONTENT-002).
 *
 * Do not invent biography, credentials, or client names
 * (engineering-rules §5.12).
 */

export interface HomepageSection {
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  /** Media reference. Replace with the designer-provided asset. */
  image: {
    publicId: string;
    width: number;
    height: number;
    /** Describes the placeholder, not a real photograph. */
    alt: string;
  };
}

export const heroContent = {
  heading: "Vestidos hechos a medida",
  subheading: "Placeholder pendiente de aprobación.",
  /**
   * Cloudinary public ID, without the file extension and without the version
   * segment. Omitting the version means the latest upload is always served,
   * so replacing the image in the dashboard needs no code change.
   *
   * NOTE: this public ID came from the WhatsApp filename of the original
   * upload. Rename it to something like `habe/hero` when convenient; naming
   * conventions are still an open question in ADR-003.
   */
  image: {
    publicId: "WhatsApp_Image_2026-10-08_at_9.46.00_PM",
    width: 1920,
    height: 1080,
    alt: "Descripción pendiente: describe qué aparece en la fotografía del banner.",
  },
};

/**
 * "¿Quién soy?" — text left, image right.
 *
 * `body` is an array so the placeholder is visibly a placeholder and does not
 * read as finished prose.
 */
export const whoContent: HomepageSection = {
  id: "quien-soy",
  eyebrow: "Sobre mí",
  heading: "¿Quién soy?",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  image: {
    publicId: "WhatsApp_Image_2026-10-08_at_9.46.00_PM",
    width: 800,
    height: 800,
    alt: "Marcador de posición para la fotografía de la diseñadora.",
  },
};

/**
 * "¿Qué hago?" — image left, text right.
 */
export const whatContent: HomepageSection = {
  id: "que-hago",
  eyebrow: "Mi trabajo",
  heading: "¿Qué hago?",
  body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  image: {
    publicId: "WhatsApp_Image_2026-10-08_at_9.46.00_PM",
    width: 800,
    height: 800,
    alt: "Marcador de posición para una fotografía de trabajo.",
  },
};

export const contactCtaContent = {
  heading: "¿Tienes un vestido en mente?",
  body: "Escríbeme y lo platicamos.",
  buttonLabel: "Contactar por WhatsApp",
  buttonMessage: "Hola, me interesa un vestido de Habe.",
};
