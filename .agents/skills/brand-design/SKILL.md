---
name: brand-design
description: Habe brand tokens, color usage rules, and verified contrast values for the Habe fashion portfolio. Use whenever colors, backgrounds, typography, or brand styling are involved in building or reviewing UI.
---

# Habe Brand Design

Brand tokens and usage rules for the Habe fashion portfolio by Hannia Farfán.

This skill exists because generic design guidance cannot know the brand. Where `frontend-design` gives general design principles, this skill gives the values. Use both.

## Confirmed Brand Facts

| Token | Value | Role |
|---|---|---|
| `brand-pink` | `#f6b1ce` | Content surface. The main page background. |
| `brand-black` | `#000000` | Text on pink, and the background of the header and footer bands |

## Color Roles

The layout uses two surfaces, and which one you are on determines what text color is allowed:

- **Pink surface** — all content sections. Carries black text and black structural elements.
- **Black band** — the header and the footer. Carries pink text and pink borders.

This split is deliberate. A single full-bleed pink field reads flat because there is no surface contrast. The black bands frame the content and give the page structure.

When adding a new section, decide its surface first, then pick text colors that are legal on it. Do not assume the page background applies to a component inside a band.

- **Official name:** Habe
- **Wordmark:** HA·BE — use the dot in visible site copy and metadata. Use the plain form "Habe" where a simplified name is appropriate.
- **Designer:** Hannia Farfán

## Verified Contrast Ratios

These are measured, not estimated.

| Combination | Ratio | Result |
|---|---|---|
| Black `#000` on pink `#f6b1ce` | 12.10:1 | WCAG AAA |
| Pink `#f6b1ce` on black `#000` | 12.10:1 | WCAG AAA |
| Black `#000` on white `#fff` | 21.00:1 | WCAG AAA |
| White `#fff` on pink `#f6b1ce` | 1.74:1 | **Fails** |

## Hard Rules

**1. Never place white text on the brand pink.** It measures 1.74:1 and fails even the 3:1 minimum for large text. Pink surfaces always carry black text. This is the single most common failure mode when working with this palette.

**2. Keep pink as a surface, not a text color.** Black on pink is safe. A muted or darkened pink for text on light backgrounds is a separate decision and must be contrast-checked before use — do not assume the brand pink works as body text.

**3. Do not introduce new brand colors.** If a design appears to need another hue, it needs a different value from the existing tokens, or a neutral from the Tailwind scale. Expanding the palette requires an explicit decision and a recorded contrast check.

## Avoiding a Generic Result

The risk with a pastel pink on black is not the palette itself, it is the treatment. Pink and black together are a common default, so the restraint has to come from execution:

- **Type carries the identity.** The palette is already decided; the personality comes from typeface choice, weight, and scale. Choose deliberately, not by reaching for a default.
- **Keep the pink a surface, not a decoration.** The pink is the page, and the black bands are the structure. The failure mode is fragmenting the pink into scattered accents on a black page, which reads as a template with a theme applied. What avoids that is the current arrangement: continuous pink content, black bands at the edges.
- **Avoid the AI-default tells.** Cream backgrounds with serif display and terracotta accents, or near-black with a single acid accent, are recognizably generated. Neither applies here, but the underlying habit of reaching for a familiar combination does.
- **Real content over placeholder copy.** Placeholder text is permitted in development (REQ-CONTENT-001) but must not be presented as final. Do not invent brand claims, designer biography, or portfolio descriptions.

## Applying in Tailwind

Define the tokens once in the global stylesheet and reference them, rather than repeating hex values across components:

```css
@theme {
  --color-brand-black: #000000;
  --color-brand-pink: #f6b1ce;
}
```

This yields `bg-brand-black`, `text-brand-pink`, and the corresponding variants. Use neutral Tailwind colors for de-emphasized text on black bands, and the brand tokens for everything else.

The token definitions in `src/app/globals.css` also carry the contrast figures in the comment above them. Keep those in sync with the table above.

## Accessibility Checklist

Before considering any color combination done:

- [ ] Text over its background measures at least 4.5:1, or 3:1 for large text
- [ ] Focus indicators remain visible against both black and pink surfaces (REQ-A11Y-002)
- [ ] Interactive states are not distinguished by color alone (REQ-A11Y-004)
- [ ] Meaningful images have descriptive alternative text (REQ-A11Y-005)

Do not claim a combination meets WCAG without measuring it. Report the actual ratio.

## Open

The logo asset with a transparent background, its favicon and social sharing variant, and the resolved typeface choices are not yet decided. Do not hardcode a substitute logo; use a neutral text-based wordmark until the asset is provided.