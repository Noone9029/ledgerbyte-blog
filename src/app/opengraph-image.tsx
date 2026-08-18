import { ImageResponse } from "next/og";

export const alt = "LedgerByte Insights — Finance and technology guidance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 74, background: "#171716", color: "#f5f0e5", fontFamily: "Arial" }}><div style={{ display: "flex", color: "#e0b562", fontSize: 26, letterSpacing: 6 }}>LEDGERBYTE INSIGHTS</div><div style={{ display: "flex", maxWidth: 920, fontSize: 82, lineHeight: 0.95, letterSpacing: -4 }}>Clear thinking for better business decisions.</div><div style={{ display: "flex", borderTop: "1px solid rgba(245,240,229,.2)", paddingTop: 24, fontSize: 24, color: "#c7bfb1" }}>FINANCE × TECHNOLOGY</div></div>, size);
}
