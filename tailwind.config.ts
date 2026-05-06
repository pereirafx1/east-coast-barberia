import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dourado âmbar — cabo da navalha do logo
        gold: {
          200: "#E8D08A",
          300: "#D9B84E",
          400: "#C9961A",
          500: "#B8860B",
          600: "#9A7010",
        },
        // Vermelho flanela — camisa do barbeiro no logo
        razor: {
          400: "#C0392B",
          500: "#9B2335", // vermelho principal
          600: "#7B1C28",
        },
        // Preto profundo do logo
        ink: "#0D0D0D",
        dark: {
          900: "#0D0D0D",
          800: "#141414",
          700: "#1C1C1C",
          600: "#252525",
          500: "#303030",
          400: "#3D3D3D",
        },
        // Creme quente para texto
        cream: {
          100: "#FAF7F0",
          200: "#EDE5D8",
          300: "#C8BBA8",
          400: "#8A7D6B",
        },
      },
      fontFamily: {
        // Bebas Neue — impacto máximo, fiel ao lettering do logo
        heading: ["var(--font-bebas)", "sans-serif"],
        // Barlow Condensed — UI, botões, navegação
        ui: ["var(--font-barlow)", "sans-serif"],
        // Special Elite — labels, accent text, typewriter vintage
        accent: ["var(--font-special)", "serif"],
        // Inter — corpo do texto
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        stamp: "0.15em",
        wide: "0.08em",
      },
    },
  },
  plugins: [],
};
export default config;
