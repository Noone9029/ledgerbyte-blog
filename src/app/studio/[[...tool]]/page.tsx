import type { Metadata } from "next";
import { SanityStudio } from "@/components/sanity-studio";
import { HAS_SANITY } from "@/lib/config";

export const metadata: Metadata = {
  title: "LedgerByte Insights Studio",
  robots: { index: false, follow: false, noarchive: true },
};

export const dynamic = "force-static";

export default function StudioPage() {
  if (!HAS_SANITY) {
    return (
      <main className="studio-setup">
        <p className="eyebrow">Configuration required</p>
        <h1>Connect the LedgerByte Sanity project</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>, <code>NEXT_PUBLIC_SANITY_DATASET</code>,
          <code>SANITY_API_READ_TOKEN</code>, and <code>SANITY_REVALIDATE_SECRET</code>, then redeploy.
        </p>
        <a className="button button-amber" href="https://www.sanity.io/manage">Open Sanity management</a>
      </main>
    );
  }
  return <SanityStudio />;
}
