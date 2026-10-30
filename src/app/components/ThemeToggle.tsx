"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { useMounted } from "@/lib/use-mounted";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={className}
    >
      {mounted ? (
        isDark ? (
          <Sun size={19} aria-hidden="true" />
        ) : (
          <Moon size={19} aria-hidden="true" />
        )
      ) : (
        <span className="h-[19px] w-[19px]" aria-hidden="true" />
      )}
    </button>
  );
}
