import { create } from "zustand";

type Store = {
  theme: string | null;
  setTheme(checked: boolean): void;
};

const useThemeStore = create<Store>()(set => ({
  theme: localStorage.getItem("mabiAuction-theme")
    ? localStorage.getItem("mabiAuction-theme")
    : window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",

  setTheme: checked => set(() => ({ theme: checked ? "dark" : "light" })),
}));

// const useThemeStore = create<Store>()(set => ({
//   theme: typeof window !== 'undefined'
//     ? (localStorage.getItem("mabiAuction-theme")
//       ?? (window.matchMedia("(prefers-color-scheme: dark)").matches
//         ? "dark"
//         : "light"))
//     : "light", // 기본값 설정

//   setTheme: checked => {
//     const newTheme = checked ? "dark" : "light";
//     if (typeof window !== 'undefined') {
//       localStorage.setItem("mabiAuction-theme", newTheme);
//     }
//     set({ theme: newTheme });
//   },
// }));

// const useThemeStore = create<Store>()(set => ({
//   theme: "light", // 기본값
//   setTheme: checked => set(() => ({ theme: checked ? "dark" : "light" })),
// }));

export default useThemeStore;
