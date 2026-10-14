export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

// Roda no <head>, antes da primeira pintura: aplica o tema salvo ou, na primeira
// visita, o do sistema. É JavaScript puro em string porque roda antes do React.
// Se o localStorage falhar (modo anônimo, por exemplo), fica no tema escuro do CSS.
export const themeInitScript = `(function () {
  try {
    var theme = localStorage.getItem("${THEME_STORAGE_KEY}");
    if (theme !== "light" && theme !== "dark") {
      theme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();`;

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Sem localStorage o tema vale só até recarregar a página.
  }
}
