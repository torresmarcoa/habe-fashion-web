import { describe, expect, it } from "vitest";

import { buildCloudinaryUrl, type MediaRef } from "@/lib/media";

const ref = (overrides: Partial<MediaRef> = {}): MediaRef => ({
  publicId: "habe/hero",
  width: 1600,
  height: 900,
  alt: "Descripción",
  ...overrides,
});

describe("buildCloudinaryUrl", () => {
  it("builds a delivery URL with format and quality negotiation", () => {
    const url = buildCloudinaryUrl(ref(), { cloudName: "demo" });

    expect(url).toBe(
      "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_1600/habe/hero",
    );
  });

  it("honours an explicit width override", () => {
    expect(
      buildCloudinaryUrl(ref(), { cloudName: "demo", width: 640 }),
    ).toContain("w_640");
  });

  it("prefers a complete src over a public ID", () => {
    const url = buildCloudinaryUrl(
      ref({ src: "/placeholder/hero.svg" }),
      { cloudName: "demo" },
    );

    expect(url).toBe("/placeholder/hero.svg");
  });

  it("returns null when a public ID has no cloud name", () => {
    expect(buildCloudinaryUrl(ref())).toBeNull();
    expect(buildCloudinaryUrl(ref(), {})).toBeNull();
  });

  it("returns null when neither src nor publicId is set", () => {
    expect(
      buildCloudinaryUrl({ width: 100, height: 100, alt: "" }, {
        cloudName: "demo",
      }),
    ).toBeNull();
  });

  it("does not request the original asset at its full size by default", () => {
    // The reference width is the display width; delivery negotiates format
    // and quality rather than assuming the original is appropriate.
    const url = buildCloudinaryUrl(ref(), { cloudName: "demo" })!;

    expect(url).toContain("f_auto");
    expect(url).toContain("q_auto");
  });
});