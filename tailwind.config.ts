import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        naomy: {
          primary: "#A855F7", // Violet
          secondary: "#F9A8D4", // Rose pastel
          accent: "#E9D5FF", // Lilas
          light: "#F8FAFC", // Blanc doux
        },
        papa: {
          primary: "#0F172A", // Bleu nuit
          secondary: "#3B82F6", // Bleu électrique
          accent: "#FACC15", // Or
          danger: "#B91C1C", // Rouge
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
