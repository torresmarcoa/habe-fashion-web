/**
 * Cloudinary media helpers.
 *
 * The MVP does not need the Cloudinary SDK. Assets are uploaded through the
 * Cloudinary dashboard and referenced by URL (ADR-003), so what the
 * application needs is a way to build a delivery URL with transformations,
 * not a way to upload files.
 *
 * A Cloudinary delivery URL has this shape:
 *
 *   https://res.cloudinary.com/<cloudName>/image/upload/<transformations>/<publicId>.<format>
 *
 * Transformations are path segments. The ones used here:
 *   f_auto  negotiate the best format the visitor's browser supports
 *   q_auto  negotiate quality from the requested quality level
 *   w_     target width in pixels
 *   dpr_   device pixel ratio multiplier
 *
 * Using `f_auto` and `q_auto` is what satisfies REQ-MEDIA-001 and
 * REQ-MEDIA-005: the browser receives modern formats at a sensible quality
 * without the application shipping full-resolution originals.
 */

/** Image widths offered to `next/image` for responsive delivery (REQ-MEDIA-002). */
export const responsiveWidths = [400, 640, 960, 1280, 1600];

/**
 * A media reference declared in content.
 *
 * Either a Cloudinary `publicId` or a complete `src` URL for local assets.
 * Keeping both in one shape means content files do not change when media
 * moves from placeholder to Cloudinary.
 */
export interface MediaRef {
  /** Cloudinary public ID, used when `cloudName` is available. */
  publicId?: string;
  /** Complete URL. Takes precedence over `publicId`. */
  src?: string;
  width: number;
  height: number;
  /** Describes the image (REQ-GALLERY-004). Empty string marks it decorative. */
  alt: string;
}

export interface CloudinaryOptions {
  cloudName?: string;
  width?: number;
}

/**
 * Builds a Cloudinary delivery URL, or returns `null` when the reference
 * cannot be resolved.
 *
 * Returning `null` rather than a broken URL lets callers fall back to a local
 * asset or a neutral block, which is what REQ-HERO-004 asks for: the hero
 * must stay understandable when media does not load.
 */
export function buildCloudinaryUrl(
  ref: MediaRef,
  options: CloudinaryOptions = {},
): string | null {
  if (ref.src) {
    return ref.src;
  }

  if (!ref.publicId || !options.cloudName) {
    return null;
  }

  const width = options.width ?? ref.width;
  const transformations = [`f_auto`, `q_auto`, `w_${width}`].join(",");

  return `https://res.cloudinary.com/${options.cloudName}/image/upload/${transformations}/${ref.publicId}`;
}

/**
 * The host that must be allowed in `next.config.ts` image configuration.
 * Returns `null` when no cloud name is configured.
 */
export function cloudinaryHost(cloudName?: string): string | null {
  return cloudName ? "res.cloudinary.com" : null;
}