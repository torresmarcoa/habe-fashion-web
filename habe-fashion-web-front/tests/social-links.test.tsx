import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SocialLinks } from "@/components/social-links";
import type { SocialProfile } from "@/types/content";

const profiles: SocialProfile[] = [
  {
    platform: "instagram",
    label: "Instagram",
    url: "https://instagram.com/habe",
  },
  { platform: "facebook", label: "Facebook" },
];

describe("SocialLinks", () => {
  it("links to the configured profile", () => {
    render(<SocialLinks profiles={profiles} />);

    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://instagram.com/habe",
    );
  });

  it("gives icon-only links an accessible name from text", () => {
    render(<SocialLinks profiles={profiles} />);

    // The glyph itself is hidden from assistive technology; the label carries
    // the name (REQ-A11Y-003).
    const link = screen.getByRole("link", { name: "Instagram" });
    const svg = link.querySelector("svg");

    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(link).toHaveTextContent("Instagram");
  });

  it("renders a brand glyph for the platform", () => {
    const { container } = render(<SocialLinks profiles={profiles} />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("omits profiles without a URL", () => {
    render(<SocialLinks profiles={profiles} />);

    expect(
      screen.queryByRole("link", { name: "Facebook" }),
    ).not.toBeInTheDocument();
  });

  it("renders nothing when no profile is configured", () => {
    const { container } = render(
      <SocialLinks profiles={[{ platform: "instagram", label: "Instagram" }]} />,
    );

    expect(screen.queryAllByRole("link")).toHaveLength(0);
    expect(container).toBeEmptyDOMElement();
  });

  it("opens external links safely", () => {
    render(<SocialLinks profiles={profiles} />);

    const link = screen.getByRole("link", { name: "Instagram" });

    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("ignores a whitespace-only URL", () => {
    render(
      <SocialLinks
        profiles={[{ platform: "instagram", label: "Instagram", url: "   " }]}
      />,
    );

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("still renders a platform without a brand glyph", () => {
    render(
      <SocialLinks
        profiles={[
          { platform: "tiktok", label: "TikTok", url: "https://tiktok.com/@habe" },
        ]}
      />,
    );

    const link = screen.getByRole("link", { name: "TikTok" });

    expect(link).toHaveAttribute("href", "https://tiktok.com/@habe");
    expect(link.querySelector("svg")).toBeNull();
  });
});