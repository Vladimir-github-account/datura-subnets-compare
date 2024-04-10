/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "main-background": "var(--main-background)",
        "secondary-background": "var(--secondary-background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        black: {
          800: "var(--black-800)",
          900: "var(--black-900)",
        },
        blue: {
          400: "var(--blue-400)",
          700: "var(--blue-700)",
        },
        green: {
          800: "var(--green-800)",
          300: "var(--green-300)",
          200: "var(--green-200)",
        },
        gray: {
          200: "var(--gray-200)",
          600: "var(--gray-600)",
          650: "var(--gray-650)",
          700: "var(--gray-700)",
        },
        red: {
          200: "var(--red-200)",
          300: "var(--red-300)",
          800: "var(--red-800)",
        },
        yellow: {
          600: "var(--yellow-600)",
        },
      },
      fontFamily: {
        jetbrains: ["Haffer", "monospace"],
      },
      fontSize: {
        "3xl": [
          " 2rem",
          {
            lineHeight: "2.5rem",
          },
        ],
        "4xl": [
          "3.5rem",
          {
            lineHeight: "3.3rem",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
      },
      boxShadow: {
        glow: "0px 0px 8px 0px #FFFFFF14",
      },
      screens: {
        "2xl": "1660px",
      },
    },
  },
  plugins: [],
};
