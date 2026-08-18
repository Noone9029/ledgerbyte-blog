"use client";

import { ArrowUpRight, List, MagnifyingGlass, X } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <div onClick={close}>
          <Brand />
        </div>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link className="nav-link nav-link-active" href="/">
            Insights
          </Link>
          <Link className="nav-link" href="/category/finance">
            Finance
          </Link>
          <Link className="nav-link" href="/category/technology">
            Technology
          </Link>
          <a className="nav-link" href="https://ledgerbyte.io/about">
            About
          </a>
        </nav>
        <div className="nav-actions">
          <Link className="search-button" href="/search" aria-label="Search articles">
            <MagnifyingGlass aria-hidden="true" />
          </Link>
          <ThemeToggle />
          <a className="button button-small nav-cta" href="https://ledgerbyte.io/contact">
            Let&apos;s Connect
            <ArrowUpRight weight="bold" aria-hidden="true" />
          </a>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <List aria-hidden="true" />}
        </button>
      </div>
      {open ? (
        <div className="mobile-navigation" data-open="true">
          <nav aria-label="Mobile navigation" onClick={close}>
            <Link href="/">Latest insights</Link>
            <Link href="/category/finance">Finance</Link>
            <Link href="/category/technology">Technology</Link>
            <Link href="/search">Search</Link>
            <a href="https://ledgerbyte.io">LedgerByte home</a>
            <a href="https://ledgerbyte.io/contact">Let&apos;s Connect</a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
