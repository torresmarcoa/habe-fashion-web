import { SocialIcon, WhatsAppIcon } from "@/components/icons";
import { runtimeConfig } from "@/content/runtime";
import { buildWhatsAppUrl, normalizePhoneNumber } from "@/lib/contact";
import type { SiteContent, SocialPlatform } from "@/types/content";

interface FooterContactRowProps {
  site: SiteContent;
}

type RowIcon = (props: { className?: string }) => React.JSX.Element;

interface ContactEntry {
  key: string;
  /** Platform name, used for the visually hidden accessible name. */
  label: string;
  /** Visible handle, number, or platform name. */
  display: string;
  href: string | null;
  Icon: RowIcon;
}

const socialIconFor: Record<string, RowIcon> = {
  instagram: ({ className }) => (
    <SocialIcon platform="instagram" className={className} />
  ),
  facebook: ({ className }) => (
    <SocialIcon platform="facebook" className={className} />
  ),
  youtube: ({ className }) => (
    <SocialIcon platform="youtube" className={className} />
  ),
};

/**
 * Formats a handle for display. Instagram handles read naturally with a
 * leading `@`; the other platforms use their bare handle or page name.
 */
function formatHandle(
  platform: SocialPlatform,
  handle: string | undefined,
  fallback: string,
): string {
  if (!handle) {
    return fallback;
  }

  return platform === "instagram" && !handle.startsWith("@")
    ? `@${handle}`
    : handle;
}

/**
 * Footer contact row: WhatsApp, Instagram, Facebook, and YouTube.
 *
 * REQ-CONTACT-002 and REQ-SOCIAL-002: each entry links to its configured
 * destination. REQ-SOCIAL-003 and REQ-CONTACT-005: destinations come from
 * configuration rather than code.
 *
 * A slot whose destination is not configured renders as a non-interactive
 * element showing the platform name, so the row always presents four entries
 * and the layout can be judged before the real profiles exist. Configured
 * slots become links showing the handle or number.
 *
 * Server Component: no client-side JavaScript is required for this.
 */
export function FooterContactRow({ site }: FooterContactRowProps) {
  const { whatsappPhone } = runtimeConfig;
  const socialHandles = site.socialHandles ?? {};
  const normalized = normalizePhoneNumber(whatsappPhone);

  const socialEntries: ContactEntry[] = site.socialProfiles.flatMap(
    (profile) => {
      const Icon = socialIconFor[profile.platform];

      if (!Icon) {
        return [];
      }

      return [
        {
          key: profile.platform,
          label: profile.label,
          display: formatHandle(
            profile.platform,
            socialHandles[profile.platform],
            profile.label,
          ),
          href: profile.url?.trim() || null,
          Icon,
        },
      ];
    },
  );

  const entries: ContactEntry[] = [
    {
      key: "whatsapp",
      label: "WhatsApp",
      display: normalized ?? "WhatsApp",
      href: buildWhatsAppUrl(whatsappPhone),
      Icon: WhatsAppIcon,
    },
    ...socialEntries,
  ];

  const baseClass =
    "flex items-center gap-2 rounded-full border border-brand-pink px-4 py-3 text-sm text-brand-pink";

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {entries.map((entry) => {
        const { Icon } = entry;

        const body = (
          <>
            <Icon className="size-5 shrink-0" />
            <span className="truncate">{entry.display}</span>
            <span className="sr-only">{entry.label}</span>
          </>
        );

        return (
          <li key={entry.key}>
            {entry.href ? (
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${baseClass} cursor-pointer transition-colors hover:bg-brand-pink hover:text-brand-black justify-center`}
              >
                {body}
              </a>
            ) : (
              <span
                aria-disabled="true"
                className={`${baseClass} text-neutral-400`}
                title={`${entry.label} not configured yet`}
              >
                {body}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
