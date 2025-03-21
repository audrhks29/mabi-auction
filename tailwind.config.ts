import type { Config } from "tailwindcss";

const config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  daisyui: {
    themes: ["light", "dark", "cupcake"],
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root",
  },

  plugins: [
    require("daisyui"),
    ({ addUtilities }: { addUtilities: any }) => {
      addUtilities({
        ".option-box": {
          "@apply relative border pt-4 pb-1 px-2 mb-4 rounded-lg mt-3 text-left": "",
        },
        ".option-box b": {
          "@apply font-bold": "",
        },
        ".option-title": {
          "@apply text-[14px] absolute -top-3 left-2 bg-base-200 shadow-sm border font-bold px-2": "",
        },
        ".quest-custom-border": {
          "@apply rounded-lg border-neutral-content dark:border-opacity-50": "",
        },
      });
    },
  ],
} satisfies Config;

export default config;
