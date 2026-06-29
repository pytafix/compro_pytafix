"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors" aria-label="Toggle Dark Mode">
        <span className="material-symbols-outlined text-on-surface-variant">light_mode</span>
      </button>
    );
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-high transition-colors text-on-surface-variant hover:text-primary"
      aria-label="Toggle Dark Mode"
    >
      <span className="material-symbols-outlined transition-all" style={{ fontVariationSettings: isDark ? "'FILL' 0" : "'FILL' 1" }}>
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
