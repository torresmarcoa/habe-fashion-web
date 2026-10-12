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
  /** Section id on the current page, e.g. "contact". */
  sectionId: string;
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
}

export interface GalleryItem {
  id: string;
  title: string;
  /** Alternative text for the image (REQ-GALLERY-004, REQ-A11Y-005). */
  alt: string;
  categoryId: string;
  /**
   * Media reference. Production media is served from Cloudinary (ADR-003);
   * this is a local placeholder until designer assets are delivered.
   */
  src: string;
  width: number;
  height: number;
}