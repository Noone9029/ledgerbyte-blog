"use client";

import Script from "next/script";
import { useEffect } from "react";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function classifyAiReferrer(hostname: string) {
  const sources: Record<string, string> = {
    "chatgpt.com": "chatgpt",
    "perplexity.ai": "perplexity",
    "copilot.microsoft.com": "copilot",
    "gemini.google.com": "gemini",
    "claude.ai": "claude",
    "you.com": "you",
  };
  return Object.entries(sources).find(([host]) => hostname === host || hostname.endsWith(`.${host}`))?.[1];
}

export function SiteAnalytics() {
  useEffect(() => {
    if (!measurementId || !document.referrer) return;
    try {
      const referrer = new URL(document.referrer);
      const source = classifyAiReferrer(referrer.hostname);
      if (!source || sessionStorage.getItem("ledgerbyte-ai-referral")) return;
      window.gtag?.("event", "ai_referral_session", {
        ai_source: source,
        referral_host: referrer.hostname,
        landing_page: window.location.pathname,
      });
      sessionStorage.setItem("ledgerbyte-ai-referral", source);
    } catch {
      // Ignore malformed referrers.
    }
  }, []);

  useEffect(() => {
    if (!measurementId) return;
    const track = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>("a");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      const eventName = url.hostname === "wa.me" ? "whatsapp_click" : url.protocol === "mailto:" ? "email_click" : url.protocol === "tel:" ? "phone_click" : url.hostname === "ledgerbyte.io" ? "service_cta_click" : null;
      if (eventName) window.gtag?.("event", eventName, { destination_host: url.hostname, destination_path: url.pathname, article_path: window.location.pathname });
    };
    document.addEventListener("click", track);
    return () => document.removeEventListener("click", track);
  }, []);

  if (!measurementId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ledgerbyte-ga" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true,cookie_flags:'SameSite=None;Secure'});` }} />
    </>
  );
}
