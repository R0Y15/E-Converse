import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        dark: {
          0: '#FFFFFF',
          1: '#1C1F2E',
          2: '#161925',
          3: '#252A41',
          4: '#1E2757'
        },
        orange: {
          1: '#FF6574'
        },
        purple: {
          1: '#D151D4'
        },
        yellow: {
          1: '#F59B6E'
        },
        blue: {
          1: '#E134A4'
        },
        sky: {
          1: '#801F81'
        }
      },
      backgroundImage: {
        hero: "url('/images/hero-bg.svg')",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config