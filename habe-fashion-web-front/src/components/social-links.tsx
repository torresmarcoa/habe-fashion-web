import { SocialIcon } from "@/components/icons";
import type { SocialPlatform, SocialProfile } from "@/types/content";

interface SocialLinksProps {
  profiles: SocialProfile[];
  className?: string;
}

/** Platforms that have a matching brand glyph in `@/components/icons`. */
const platformsWithIcon = ["instagram", "facebook"] as const;

type IconPlatform = (typeof platformsWithIcon)[number];

function hasBrandIcon(
  platform: SocialPlatform,
): platform is SocialPlatform & IconPlatform {
  return (platformsWithIcon as readonly SocialPlatform[]).includes(platform);
}

/**
 * Social media links (REQ-SOCIAL-001).
 *
 * Profiles without a URL are omitted rather than rendered as dead links, so
 * the site never shows a link that cannot be followed. Do not invent profile
 * URLs (engineering-rules §5.12).
 *
 * Each link shows a brand glyph paired with a visually hidden label, so the
 * accessible name comes from text rather than from an image (REQ-A11Y-003,
 * REQ-A11Y-005). External links open in a new tab with `rel="noopener
 * noreferrer"`.
 *
 * Server Component: no client-side JavaScript is required for this.
 */
export function SocialLinks({ profiles, className }: SocialLinksProps) {
  const configured = profiles.filter(
    (profile): profile is SocialProfile & { url: string } =>
      typeof profile.url === "string" && profile.url.trim().length > 0,
  );

  if (configured.length === 0) {
    return null;
  }

  return (
    <ul className={className}>
      {configured.map((profile) => (
        <li key={profile.platform}>
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-pink hover:text-brand-pink/90"
          >
            {hasBrandIcon(profile.platform) ? (
              <SocialIcon platform={profile.platform} className="size-5" />
            ) : null}
            <span className="sr-only">{profile.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
