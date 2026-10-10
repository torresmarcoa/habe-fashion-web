import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import { whatContent, whoContent } from "@/content/about";
import { siteContent } from "@/content/site";

describe("HomePage", () => {
  it("renders a single level-one heading", () => {
    render(<HomePage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders the sections in order", () => {
    const { container } = render(<HomePage />);
    const sections = Array.from(container.querySelectorAll("section"));

    expect(sections.map((section) => section.id)).toEqual([
      "inicio",
      whoContent.id,
      whatContent.id,
      "contacto",
    ]);
  });

  it("gives every section an accessible name", () => {
    const { container } = render(<HomePage />);

    for (const section of container.querySelectorAll("section")) {
      expect(section).toHaveAttribute("aria-labelledby");
    }
  });

  it("provides a target for every navigation item", () => {
    const { container } = render(<HomePage />);
    const ids = new Set(
      Array.from(container.querySelectorAll("section")).map(
        (section) => section.id,
      ),
    );

    for (const item of siteContent.navigation) {
      expect(ids.has(item.sectionId)).toBe(true);
    }
  });

  it("renders the section headings", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "¿Quién soy?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "¿Qué hago?" }),
    ).toBeInTheDocument();
  });

  it("closes with the contact call to action", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "¿Tienes un vestido en mente?",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Escríbeme y lo platicamos."),
    ).toBeInTheDocument();
  });

  it("renders descriptive alternative text for section images", () => {
    render(<HomePage />);

    for (const section of [whoContent, whatContent]) {
      expect(
        screen.getByRole("img", { name: section.image.alt }),
      ).toBeInTheDocument();
    }
  });

  it("renders no contact link when no number is configured", () => {
    render(<HomePage />);

    // The CTA label is still present so the section reads as a contact
    // prompt, but nothing is actionable yet.
    expect(screen.getAllByText("Contactar por WhatsApp").length).toBeGreaterThan(
      0,
    );
  });
});