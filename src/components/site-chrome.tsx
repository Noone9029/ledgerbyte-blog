"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const studio = pathname.startsWith("/studio");
  if (studio) return <>{children}</>;
  return <><SiteHeader />{children}<SiteFooter /></>;
}
