import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Brand } from "@/components/brand";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <Brand />
        <p>Practical finance and technology insight for growing businesses.</p>
        <a className="footer-contact" href="https://ledgerbyte.io/contact">
          Let&apos;s Connect <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="footer-links">
        <div>
          <h2>Insights</h2>
          <Link href="/">Latest articles</Link>
          <Link href="/category/finance">Finance</Link>
          <Link href="/category/technology">Technology</Link>
          <Link href="/search">Search</Link>
        </div>
        <div>
          <h2>LedgerByte</h2>
          <a href="https://ledgerbyte.io/finance">Finance services</a>
          <a href="https://ledgerbyte.io/technology">Technology services</a>
          <a href="https://ledgerbyte.io/about">About us</a>
          <a href="https://ledgerbyte.io/contact">Contact</a>
        </div>
        <div>
          <h2>Legal</h2>
          <a href="https://ledgerbyte.io/privacy-policy">Privacy policy</a>
          <a href="https://ledgerbyte.io/terms-of-use">Terms of use</a>
          <a href="https://www.linkedin.com/company/ledger-byte/">LinkedIn</a>
        </div>
        <div>
          <h2>Contact</h2>
          <a href="mailto:info@ledgerbyte.io">info@ledgerbyte.io</a>
          <a href="tel:+971561371569">+971 56 137 1569</a>
          <a href="https://wa.me/971561371569">WhatsApp</a>
          <span>Sharjah, United Arab Emirates</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 LedgerByte Tech. All rights reserved.</span>
        <span>SMART ACCOUNTING</span>
      </div>
    </footer>
  );
}
