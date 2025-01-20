export function setColorsByTheme() {
  const localTheme = localStorage.getItem("mabiAuction-theme");
  const userSystemTheme = window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light";

  localTheme
    ? document.querySelector("html")?.setAttribute("data-theme", localTheme!)
    : document.querySelector("html")?.setAttribute("data-theme", userSystemTheme);
}
