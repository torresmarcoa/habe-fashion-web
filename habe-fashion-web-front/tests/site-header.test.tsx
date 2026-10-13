import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "@/components/site-header";
import { siteContent } from "@/content/site";

describe("SiteHeader", () => {
  it("frames the wordmark with decorative stars", () => {
  const { container } = render(
    <SiteHeader
      navigation={siteContent.navigation}
      wordmark={siteContent.wordmark}
      homeLabel="Habe, ir al inicio"
    />,
  );

  const link = screen.getByRole("link", { name: "Habe, ir al inicio" });
  const stars = link.querySelectorAll("svg");

  expect(stars).toHaveLength(2);
  for (const star of stars) {
    // Decorative: hidden from assistive technology (REQ-A11Y-006).
    expect(star).toHaveAttribute("aria-hidden", "true");
  }

  // The stars sit before and after the wordmark text.
  expect(container.querySelectorAll("header svg")).toHaveLength(2);
});

it("shows the contact action when a number is configured", () => {
  render(
    <SiteHeader
      navigation={siteContent.navigation}
      wordmark={siteContent.wordmark}
      homeLabel="Habe, ir al inicio"
      whatsappPhone="5215555555555"
    />,
  );

  const link = screen.getByRole("link", { name: "Contactar por WhatsApp" });

  expect(link).toHaveAttribute(
    "href",
    expect.stringContaining("https://wa.me/5215555555555"),
  );
  expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
});

it("omits the contact action when no number is configured", () => {
  render(
    <SiteHeader
      navigation={siteContent.navigation}
      wordmark={siteContent.wordmark}
      homeLabel="Habe, ir al inicio"
    />,
  );

  expect(
    screen.queryByRole("link", { name: "Contactar por WhatsApp" }),
  ).not.toBeInTheDocument();
});

it("exposes a primary navigation landmark", () => {
    render(
      <SiteHeader
        navigation={siteContent.navigation}
        wordmark={siteContent.wordmark}
        homeLabel="Habe, ir al inicio"
      />,
    );

    expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
  });

  it("links each navigation item to its section", () => {
    render(
      <SiteHeader
        navigation={siteContent.navigation}
        wordmark={siteContent.wordmark}
        homeLabel="Habe, ir al inicio"
      />,
    );

    for (const item of siteContent.navigation) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href,
      );
    }
  });

  it("gives the wordmark an accessible name instead of reading the dot", () => {
    render(
      <SiteHeader
        navigation={siteContent.navigation}
        wordmark={siteContent.wordmark}
        homeLabel="Habe, ir al inicio"
      />,
    );

    expect(
      screen.getByRole("link", { name: "Habe, ir al inicio" }),
    ).toBeInTheDocument();
  });

  it("exposes the mobile toggle as a button with its expanded state", async () => {
    const user = userEvent.setup();

    render(
      <SiteHeader
        navigation={siteContent.navigation}
        wordmark={siteContent.wordmark}
        homeLabel="Habe, ir al inicio"
      />,
    );

    const toggle = screen.getByRole("button", { name: "Menú" });

    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(
      screen.getByRole("button", { name: "Cerrar" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("is operable by keyboard", async () => {
    const user = userEvent.setup();

    render(
      <SiteHeader
        navigation={siteContent.navigation}
        wordmark={siteContent.wordmark}
        homeLabel="Habe, ir al inicio"
      />,
    );

    await user.tab();

    expect(screen.getByRole("link", { name: "Habe, ir al inicio" })).toHaveFocus();

    await user.tab();

    expect(screen.getByRole("button", { name: "Menú" })).toHaveFocus();

    await user.keyboard("{Enter}");

    expect(
      screen.getByRole("button", { name: "Cerrar" }),
    ).toHaveAttribute("aria-expanded", "true");
  });
});