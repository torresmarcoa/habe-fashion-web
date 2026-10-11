import { designCategories } from "@/content/categories";

/**
 * Homepage shell for the layout feature.
 *
 * Scope of this feature is the layout, navigation, and footer only
 * (REQ-NAV-001 through REQ-NAV-004, REQ-CONTACT-003, REQ-SEO-001, REQ-SEO-002).
 * The hero, gallery, and category showcase arrive in later features and are
 * not implemented here.
 *
 * The sections referenced by the navigation exist so that REQ-NAV-004 has
 * real targets to verify.
 */
export default function HomePage() {
  return (
    <>
      <section
        id="inicio"
        aria-labelledby="inicio-heading"
        className="mx-auto max-w-6xl px-4 py-20"
      >
        <h1
          id="inicio-heading"
          className="font-display text-5xl text-brand-black"
        >
          Portfolio
        </h1>
        <p className="mt-4 max-w-prose">
          El contenido del sitio se irá incorporando por secciones.
        </p>
      </section>

      <section
        id="galeria"
        aria-labelledby="galeria-heading"
        className="mx-auto max-w-6xl px-4 py-20"
      >
        <h2 id="galeria-heading" className="font-display text-3xl">
          Galería
        </h2>
        <p className="mt-4 max-w-prose">
          Las categorías del portfolio son:{" "}
          {designCategories.map((category) => category.name).join(", ")}.
        </p>
      </section>
    </>
  );
}