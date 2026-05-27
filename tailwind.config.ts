import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper:   "#FAF7F2",
        "paper-2": "#F3EEE3",
        ink:     "#14110F",
        "ink-2": "#3A322B",
        "ink-3": "#6B5F52",
        "ink-4": "#9A8B7B",
        line:    "#E6DDCC",
        card:    "#FFFFFF",
        accent:  "#C84B3A",
        gold:    "#B08847",
        "gold-2": "#8C6B33",
        wood:    "#2F6B4F",
        fire:    "#C04B3D",
        earth:   "#B08847",
        metal:   "#8A8C8E",
        water:   "#2A3E64",
        "wood-soft":  "#E1ECDF",
        "fire-soft":  "#F2DDD8",
        "earth-soft": "#EFE3CB",
        "metal-soft": "#E3E5E7",
        "water-soft": "#D9DEE7",
      },
      fontFamily: {
        sans:  ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Noto Serif KR", "serif"],
        hanja: ["var(--font-hanja)", "Noto Serif TC", "serif"],
        mono:  ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
