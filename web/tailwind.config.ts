import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        cinzel: ["var(--font-cinzel)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        hiero: ["var(--font-noto-hiero)", "Segoe UI Historic", "serif"],
      },
      keyframes: {
        "hero-earth-spin": {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        "mandala-spin": { to: { transform: "rotate(360deg)" } },
        "mandala-spin-rev": { to: { transform: "rotate(-360deg)" } },
        "mandala-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.5" },
          "50%": { transform: "scale(1.06)", opacity: "0.85" },
        },
        "tri-drift": {
          "0%, 100%": { transform: "translate(0,0) rotate(0deg)" },
          "33%": { transform: "translate(2%,1%) rotate(1deg)" },
          "66%": { transform: "translate(-1%,2%) rotate(-0.5deg)" },
        },
      },
      animation: {
        "hero-earth": "hero-earth-spin 56s linear infinite",
        "mandala-1": "mandala-spin var(--m-d1,24s) linear infinite",
        "mandala-2": "mandala-spin-rev var(--m-d2,18s) linear infinite",
        "mandala-3": "mandala-spin var(--m-d3,32s) linear infinite",
        "mandala-4": "mandala-pulse 4s ease-in-out infinite",
        "mandala-5":
          "mandala-spin-rev calc(var(--m-d1, 24s) * 1.4) linear infinite",
        "tri-drift": "tri-drift 28s ease-in-out infinite",
        "tri-drift-grid": "tri-drift 40s linear infinite reverse",
      },
    },
  },
  plugins: [],
} satisfies Config;
