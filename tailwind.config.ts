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
        // Vintage gold — extraído do badge do logo
        gold: {
          100: "#F5E9C4",
          200: "#E8D08A",
          300: "#D9B84E",
          400: "#C9961A", // dourado vintage principal
          500: "#B8860B", // dourado escuro para fundos
          600: "#9A7010", // bordas e detalhes
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
        // Creme quente para texto (em vez de branco frio)
        cream: {
          100: "#FAF7F0",
          200: "#EDE5D8", // texto principal
          300: "#C8BBA8", // texto secundário
          400: "#8A7D6B", // texto muito suave
        },
      },
      fontFamily: {
        heading: ["var(--font-oswald)", "sans-serif"],
        accent: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        stamp: "0.25em",
        widest: "0.3em",
      },
    },
  },
  plugins: [],
};
export default config;
