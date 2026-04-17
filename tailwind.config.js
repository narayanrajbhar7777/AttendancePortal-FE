/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00488d",
        surface: "#f9f9fd",
        "surface-low": "#f3f3f7",
        "surface-lowest": "#ffffff",
        "surface-high": "#e7e8eb",
        outline: "#727783",
        "outline-variant": "#c2c6d4",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        tertiary: "#005412",
        "tertiary-fixed": "#a3f69c",
        "secondary-container": "#c7dbff",
        "primary-fixed": "#d6e3ff",
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};