"use client";

import { useSyncExternalStore } from "react";

export const THEME_KEY = "tickora-theme";

/**
 * Runs in <head> before first paint, so the page never flashes the wrong theme.
 * A saved choice wins; otherwise follow the visitor's system setting.
 */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_KEY}");if(t!=="dark"&&t!=="light")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}`;

type Theme = "light" | "dark";

const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
const getTheme = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");
const getServerTheme = (): Theme | null => null;

function setTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // Private mode or storage disabled: the theme still changes for this page view.
  }
  listeners.forEach((l) => l());
}

/** Sun/moon switch. The knob position comes from CSS on [data-theme], so server and client markup match. */
export function ThemeToggle({ label }: { label: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={theme === null ? undefined : theme === "dark"}
      aria-label={label}
      title={label}
      className="theme-toggle"
      onClick={() => setTheme(getTheme() === "dark" ? "light" : "dark")}
    >
      <span className="theme-knob" aria-hidden="true">
        <svg className="i-sun" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
        </svg>
        <svg className="i-moon" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1Z" />
        </svg>
      </span>
    </button>
  );
}
