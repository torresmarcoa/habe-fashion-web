import { describe, expect, it } from "vitest";

import { buildWhatsAppUrl, normalizePhoneNumber } from "@/lib/contact";

describe("normalizePhoneNumber", () => {
  it("keeps an already-normalized number unchanged", () => {
    expect(normalizePhoneNumber("5215555555555")).toBe("5215555555555");
  });

  it("strips formatting characters", () => {
    expect(normalizePhoneNumber("+52 1 55 5555 5555")).toBe("5215555555555");
    expect(normalizePhoneNumber("(52) 1 55 5555 5555")).toBe("5215555555555");
    expect(normalizePhoneNumber("52-1-55-5555-5555")).toBe("5215555555555");
  });

  it("removes a leading zero from the country code", () => {
    expect(normalizePhoneNumber("05215555555555")).toBe("5215555555555");
  });

  it("returns null when no digits are present", () => {
    expect(normalizePhoneNumber("")).toBeNull();
    expect(normalizePhoneNumber("   ")).toBeNull();
    expect(normalizePhoneNumber("not-a-number")).toBeNull();
  });

  it("returns null when the value is not configured", () => {
    expect(normalizePhoneNumber(undefined)).toBeNull();
  });
});

describe("buildWhatsAppUrl", () => {
  it("builds a wa.me URL from the configured number", () => {
    expect(buildWhatsAppUrl("5215555555555")).toBe(
      "https://wa.me/5215555555555",
    );
  });

  it("appends an encoded prefilled message", () => {
    const url = buildWhatsAppUrl(
      "5215555555555",
      "Hola, me interesa un vestido.",
    );

    expect(url).not.toBeNull();
    expect(url).toContain("https://wa.me/5215555555555?text=");
    expect(decodeURIComponent(new URL(url!).searchParams.get("text")!)).toBe(
      "Hola, me interesa un vestido.",
    );
  });

  it("encodes characters that would break the query string", () => {
    const url = buildWhatsAppUrl("5215555555555", "¿Vestido de novia &，急?")!;

    expect(new URL(url).searchParams.get("text")).toBe(
      "¿Vestido de novia &，急?",
    );
  });

  it("returns null when the number is not configured", () => {
    expect(buildWhatsAppUrl(undefined)).toBeNull();
    expect(buildWhatsAppUrl("")).toBeNull();
  });
});