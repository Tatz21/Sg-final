import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Nunito", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ['"Cormorant Garamond"', "Georgia", "serif"],
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        navy: {
          950: "#040814",
          900: "#080f24",
          850: "#0c1735",
          800: "#101e46",
          700: "#182c66",
          600: "#24408e",
        },
        gold: {
          50: "#faf7ee",
          100: "#f4edda",
          200: "#e9dab5",
          300: "#dcbf87",
          400: "#cda55f",
          500: "#be9042",
          600: "#a57534",
          700: "#84562b",
          800: "#6d4428",
          900: "#5a3824",
        },
        stone: {
          25: "#fdfbf7",
          50: "#f9f7f2",
          100: "#f2eee5",
          200: "#e5ded0",
          300: "#d3c8b4",
          400: "#b3a38b",
          500: "#8f7e65",
          600: "#6e604c",
          700: "#524738",
          800: "#383126",
          900: "#221d17",
        },
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(circle at center, rgba(197, 160, 89, 0.15) 0%, transparent 70%)',
        'noise-pattern': 'url("/images/noise.png")',
      },
      boxShadow: {
        'luxury': '0 25px 50px -12px rgba(4, 8, 20, 0.35)',
        'luxury-gold': '0 20px 40px -15px rgba(190, 144, 66, 0.3)',
        'inner-glow': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      },
      letterSpacing: {
        'widest-xl': '0.3em',
        'widest-2xl': '0.4em',
      },
    },
  },
  plugins: [],
};

export default config;
