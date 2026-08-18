"use client";

import { Moon, Sun } from "@phosphor-icons/react";

export function ThemeToggle() {
  const toggle = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    window.localStorage.setItem("ledgerbyte-theme", next);
  };

  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
    >
      <Sun className="theme-icon theme-icon-sun" aria-hidden="true" />
      <Moon className="theme-icon theme-icon-moon" aria-hidden="true" />
    </button>
  );
}
