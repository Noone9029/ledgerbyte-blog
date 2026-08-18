import type { Metadata, Viewport } from "next";
import { draftMode } from "next/headers";
import localFont from "next/font/local";
import Script from "next/script";
import { VisualEditing } from "next-sanity/visual-editing";
import { SiteChrome } from "@/components/site-chrome";
import { SiteAnalytics } from "@/components/site-analytics";
import { StructuredData } from "@/components/structured-data";
import {
  absoluteUrl,
  HAS_SANITY,
  IS_INDEXING_ENABLED,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

const cabinetGrotesk = localFont({
  variable: "--font-cabinet-grotesk",
  display: "swap",
  src: [
    { path: "../../public/fonts/cabinet-grotesk-400.woff2", weight: "400" },
    { path: "../../public/fonts/cabinet-grotesk-500.woff2", weight: "500" },
    { path: "../../public/fonts/cabinet-grotesk-700.woff2", weight: "700" },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createMetadata({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    noIndex: !IS_INDEXING_ENABLED,
  }),
  applicationName: SITE_NAME,
  creator: "LedgerByte",
  publisher: "LedgerByte",
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e5" },
    { media: "(prefers-color-scheme: dark)", color: "#171716" },
  ],
};

const themeInitializer = `(function(){try{var stored=localStorage.getItem('ledgerbyte-theme');var theme=stored==='light'||stored==='dark'?stored:(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme}catch(_){document.documentElement.dataset.theme='dark'}})();`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const preview = (await draftMode()).isEnabled;
  return (
    <html lang="en" className={cabinetGrotesk.variable} suppressHydrationWarning>
      <body>
        <Script id="ledgerbyte-theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeInitializer }} />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <StructuredData data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://ledgerbyte.io/#organization",
          name: "LedgerByte",
          url: "https://ledgerbyte.io",
          logo: absoluteUrl("/brand/ledgerbyte-logo.png"),
          sameAs: ["https://www.linkedin.com/company/ledger-byte/"],
        }} />
        <SiteChrome>{children}</SiteChrome>
        <SiteAnalytics />
        {preview && HAS_SANITY && <VisualEditing />}
      </body>
    </html>
  );
}
