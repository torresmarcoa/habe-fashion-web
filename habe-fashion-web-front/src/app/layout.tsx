import type { Metadata } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { runtimeConfig } from "@/content/runtime";
import { siteContent } from "@/content/site";
import "./globals.css";

/**
 * Display face for the wordmark and headings, echoing the serif of the brand
 * lockup. Body copy uses Work Sans. Two faces, clearly distinct.
 */
const displayFont = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const bodyFont = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

/**
 * REQ-SEO-001: meaningful page title.
 * REQ-SEO-002: meaningful meta description.
 * REQ-SEO-006: metadata for social sharing.
 *
 * metadataBase is left unset: the production domain is still an open decision
 * (specs/product.md §14.2), and inventing a host here would produce wrong
 * absolute URLs for social sharing. Set it when the domain is chosen.
 */
export const metadata: Metadata = {
  title: {
    default: `${siteContent.wordmark} — ${siteContent.designerName}`,
    template: `%s — ${siteContent.wordmark}`,
  },
  description: siteContent.description,
  openGraph: {
    type: "website",
    siteName: siteContent.name,
    title: `${siteContent.wordmark} — ${siteContent.designerName}`,
    description: siteContent.description,
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteContent.wordmark} — ${siteContent.designerName}`,
    description: siteContent.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-MX"
      className={`${displayFont.variable} ${bodyFont.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-[#f6b1ce] text-black antialiased">
        {/* REQ-A11Y-001: keyboard users can bypass the navigation. */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-brand-black focus:px-4 focus:py-2 focus:text-brand-pink focus:outline-2 focus:outline-offset-2 focus:outline-brand-pink"
        >
          Saltar al contenido
        </a>

        <SiteHeader
          navigation={siteContent.navigation}
          wordmark={siteContent.wordmark}
          homeLabel={`${siteContent.name}, ir al inicio`}
          whatsappPhone={runtimeConfig.whatsappPhone}
        />

        <main id="contenido" className="flex-1">
          {children}
        </main>

        <SiteFooter site={siteContent} />
      </body>
    </html>
  );
}
