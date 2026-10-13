"use client";

import { useState } from "react";

import { StarIcon, WhatsAppIcon } from "@/components/icons";
import { buildWhatsAppUrl } from "@/lib/contact";
import type { NavigationItem } from "@/types/content";

interface SiteHeaderProps {
  navigation: NavigationItem[];
  wordmark: string;
  /** Text announced to assistive technology instead of the decorative wordmark. */
  homeLabel: string;
  /** Business number. The header contact action is omitted when absent. */
  whatsappPhone?: string;
}

const MENU_ID = "primary-navigation";

/**
 * Site header with primary navigation.
 *
 * REQ-NAV-001 provides access to the main sections. REQ-NAV-004 sends the
 * visitor to the corresponding section, or to a route when the destination
 * is a separate page.
 * REQ-NAV-003 keeps the navigation usable at mobile, tablet, and desktop
 * widths: the full list is shown from the `md` breakpoint upward, and a
 * toggle is used below it.
 *
 * REQ-A11Y-001: the toggle is a real button, operable by keyboard.
 * REQ-A11Y-002: focus visibility comes from the global focus styles.
 * REQ-A11Y-003: the toggle carries `aria-expanded` and an accessible name.
 *
 * The header also carries the primary contact action (REQ-CONTACT-004), which
 * requires the visitor to reach WhatsApp without scrolling past unrelated
 * sections. The action is omitted entirely when no number is configured, so
 * the header never shows a control that cannot be used.
 *
 * Client Component: the menu toggle requires interactive state. This is the
 * only client component introduced by the layout feature; everything else
 * remains server-rendered.
 */
export function SiteHeader({
  navigation,
  wordmark,
  homeLabel,
  whatsappPhone,
}: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappHref = buildWhatsAppUrl(
    whatsappPhone,
    "Hola, me interesa un vestido de Habe.",
  );

  return (
    <header className="border-b border-brand-black bg-brand-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <a
          href="#inicio"
          className="font-display flex items-center gap-2 text-2xl tracking-tight text-brand-pink"
        >
          {/* Decorative stars from the brand lockup (REQ-A11Y-006). */}
          <StarIcon className="size-3 sm:size-4" />
          <span aria-hidden="true">{wordmark}</span>
          <StarIcon className="size-3 sm:size-4" />
          <span className="sr-only">{homeLabel}</span>
        </a>

        <div className="flex items-center gap-3">
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-brand-pink text-brand-black transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon className="size-5" />
              <span className="sr-only">Contactar por WhatsApp</span>
            </a>
          ) : null}

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls={MENU_ID}
            className="md:hidden"
          >
            {isOpen ? "Cerrar" : "Menú"}
          </button>
        </div>

        <nav
          id={MENU_ID}
          aria-label="Principal"
          className={`${isOpen ? "block" : "hidden"} absolute inset-x-0 top-full border-b border-brand-black bg-brand-black px-4 py-4 md:static md:block md:border-0 md:bg-transparent md:px-0 md:py-0`}
        >
          <ul className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 text-brand-pink">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
