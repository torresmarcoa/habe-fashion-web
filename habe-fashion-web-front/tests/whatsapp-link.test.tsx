import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WhatsAppLink } from "@/components/whatsapp-link";

describe("WhatsAppLink", () => {
  it("links to the configured number", () => {
    render(
      <WhatsAppLink phone="5215555555555">Contactar por WhatsApp</WhatsAppLink>,
    );

    const link = screen.getByRole("link", { name: "Contactar por WhatsApp" });

    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("https://wa.me/5215555555555"),
    );
  });

  it("normalizes a formatted number", () => {
    render(
      <WhatsAppLink phone="+52 1 55 5555 5555">Contactar por WhatsApp</WhatsAppLink>,
    );

    expect(
      screen.getByRole("link", { name: "Contactar por WhatsApp" }),
    ).toHaveAttribute("href", "https://wa.me/5215555555555");
  });

  it("includes the prefilled message", () => {
    render(
      <WhatsAppLink phone="5215555555555" message="Hola">
        Contactar por WhatsApp
      </WhatsAppLink>,
    );

    const href = screen
      .getByRole("link", { name: "Contactar por WhatsApp" })
      .getAttribute("href");

    expect(new URL(href!).searchParams.get("text")).toBe("Hola");
  });

  it("opens in a new tab safely", () => {
    render(
      <WhatsAppLink phone="5215555555555">Contactar por WhatsApp</WhatsAppLink>,
    );

    const link = screen.getByRole("link", { name: "Contactar por WhatsApp" });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("keeps the glyph decorative alongside the visible label", () => {
    const { container } = render(
      <WhatsAppLink phone="5215555555555">
        <svg aria-hidden="true" data-testid="glyph" />
        Contactar por WhatsApp
      </WhatsAppLink>,
    );

    const glyph = container.querySelector("svg");

    expect(glyph).toHaveAttribute("aria-hidden", "true");
    // The accessible name comes from the text, never from the glyph.
    expect(
      screen.getByRole("link", { name: "Contactar por WhatsApp" }),
    ).toBeInTheDocument();
  });

  it("renders no link when the number is not configured", () => {
    render(<WhatsAppLink phone={undefined}>Contactar por WhatsApp</WhatsAppLink>);

    expect(
      screen.queryByRole("link", { name: "Contactar por WhatsApp" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Contactar por WhatsApp")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });
});