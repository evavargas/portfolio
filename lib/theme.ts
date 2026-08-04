export const THEME_STORAGE_KEY = "portfolio-theme";
export type ThemeMode = "light" | "dark" | "system";

export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k)||"light";var d=document.documentElement;var r=t==="system"?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":t;d.setAttribute("data-theme",r);d.style.colorScheme=r;}catch(e){}})();`;

export function resolveTheme(theme: ThemeMode): "light" | "dark" {
  if (theme === "system") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return theme;
}

export function applyTheme(theme: ThemeMode) {
  const resolved = resolveTheme(theme);
  document.documentElement.setAttribute("data-theme", resolved);
  document.documentElement.style.colorScheme = resolved;
}
