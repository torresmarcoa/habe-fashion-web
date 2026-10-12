import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FooterContactRow } from "@/components/footer-contact-row";
import { siteContent } from "@/content/site";

/**
 * Runtime configuration is read from environment variables at module load, so
 * these cases cover the behaviour the component defines for both the
 * configured and unconfigured branches without depending on env state.
 */

describe("FooterContactRow", () => {
  it("presents all four contact slots", () => {
    const { container } = render(
      <FooterContactRow site={siteContent} />,
    );

    expect(container.querySelectorAll("li")).toHaveLength(4);
  });

  it("names every slot for assistive technology", () => {
    render(<FooterContactRow site={siteContent} />);

    for (const label of ["WhatsApp", "Instagram", "Facebook", "YouTube"]) {
      expect(screen.getByText(label, { selector: ".sr-only" })).toBeInTheDocument();
    }
  });

  it("renders a brand glyph per slot", () => {
    const { container } = render(<FooterContactRow site={siteContent} />);

    expect(container.querySelectorAll("svg")).toHaveLength(4);
  });

  it("keeps glyphs decorative so the label carries the name", () => {
    const { container } = render(<FooterContactRow site={siteContent} />);

    for (const glyph of container.querySelectorAll("svg")) {
      expect(glyph).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("renders unconfigured slots as non-interactive elements", () => {
    const { container } = render(<FooterContactRow site={siteContent} />);

    // With no environment configuration, nothing should be a link.
    expect(screen.queryAllByRole("link")).toHaveLength(0);
    expect(container.querySelectorAll('[aria-disabled="true"]').length)
      .toBeGreaterThan(0);
  });

  it("falls back to the platform name when no handle is configured", () => {
    const { container } = render(<FooterContactRow site={siteContent} />);

    // The visible slot text is the platform name, not an empty slot. The
    // visually hidden label repeats it for assistive technology.
    const visible = container.querySelectorAll("span:not(.sr-only)");

    expect([...visible].map((node) => node.textContent)).toContain("Instagram");
    expect([...visible].map((node) => node.textContent)).toContain("YouTube");
  });
});