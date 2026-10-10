import Image from "next/image";

import { runtimeConfig } from "@/content/runtime";
import { buildCloudinaryUrl, type MediaRef } from "@/lib/media";

type OptimizedImageProps = Omit<MediaRef, "width" | "height"> & {
  /** Layout mode. `fill` requires the parent to be positioned. */
  fill?: boolean;
  width?: number;
  height?: number;
  sizes: string;
  className?: string;
  /** Set only for the image in the initial viewport (REQ-MEDIA-004). */
  priority?: boolean;
  /** Renders with an empty alt, marking the image decorative. */
  decorative?: boolean;
};

/**
 * Image with optimized delivery.
 *
 * REQ-MEDIA-001 and REQ-MEDIA-005: Cloudinary URLs carry `f_auto` and `q_auto`
 * so the browser receives a modern format at a sensible quality instead of an
 * original-resolution asset.
 * REQ-MEDIA-002: `sizes` describes the rendered width at each breakpoint so
 * the browser picks an appropriate candidate.
 * REQ-MEDIA-004: `priority` is set only for the hero image, which is in the
 * initial viewport. Everything below the fold lazy-loads by default.
 * REQ-HERO-004 and REQ-A11Y-005: the alt text comes from the content
 * reference; decorative images receive an empty alt.
 *
 * When a Cloudinary public ID has no resolvable URL, a neutral branded block
 * is rendered instead, so a missing asset never breaks the layout.
 *
 * Server Component: no client-side JavaScript is required for this.
 */
export function OptimizedImage({
  publicId,
  src,
  width,
  height,
  alt,
  fill = false,
  sizes,
  className,
  priority = false,
  decorative = false,
}: OptimizedImageProps) {
  const url = buildCloudinaryUrl(
    {
      publicId,
      src,
      alt,
      width: width ?? 1600,
      height: height ?? 900,
    },
    { cloudName: runtimeConfig.cloudinaryCloudName },
  );

  if (!url) {
    return (
      <div
        role="img"
        aria-label={decorative ? undefined : alt}
        aria-hidden={decorative || undefined}
        className={`bg-brand-black ${className ?? ""}`}
      />
    );
  }

  const altText = decorative ? "" : alt;

  if (fill) {
    return (
      <Image
        src={url}
        alt={altText}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${className ?? ""}`}
      />
    );
  }

  return (
    <Image
      src={url}
      alt={altText}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}