/**
 * Content types for the Habe portfolio.
 *
 * Portfolio content lives in `src/content/` as typed modules so that replacing
 * placeholder content with designer-provided content is a data-only change
 * (REQ-CONTENT-002, ADR-007).
 */

export type SocialPlatform = "instagram" | "facebook" | "youtube" | "tiktok" | "pinterest";

export interface SocialProfile {
  platform: SocialPlatform;
  /** Accessible label for the link, e.g. "Instagram". */
  label: string;
  /** Absolute profile URL. Empty or undefined means the profile is not configured. */
  url?: string;
}

export interface NavigationItem {
  label: string;
  /**
   * Either a section anchor on the current page (`#contacto`) or an internal
   * route (`/galeria`). Named `href` because it is not always a section.
   */
  href: string;
}

/**
 * Media reference for gallery content.
 *
 * Declared as a Cloudinary public ID or a complete `src` for local assets, so
 * a placeholder can be replaced by a production asset without changing the
 * type (REQ-CONTENT-002, ADR-003).
 */
export interface GalleryMedia {
  publicId?: string;
  src?: string;
  width: number;
  height: number;
}

export interface SiteContent {
  /** Official name. Used for metadata and documentation. */
  name: string;
  /** Display form of the wordmark, including the dot from the logo lockup. */
  wordmark: string;
  designerName: string;
  tagline: string;
  description: string;
  navigation: NavigationItem[];
  socialProfiles: SocialProfile[];
  /**
   * Handles displayed alongside each platform in the footer. A platform with
   * no handle falls back to its label rather than showing an empty slot
   * (REQ-CONTENT-004).
   */
  socialHandles?: Partial<Record<SocialPlatform, string>>;
}

export interface DesignCategory {
  id: string;
  name: string;
  description: string;
  /**
   * Path segment used for the category route. Matches `id` by default;
   * separate so a readable URL can differ from the internal identifier
   * (REQ-SEO-008).
   */
  slug: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  /** Alternative text for the image (REQ-GALLERY-004, REQ-A11Y-005). */
  alt: string;
  categoryId: string;
  media: GalleryMedia;
}