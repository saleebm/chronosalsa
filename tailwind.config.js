let font_base = 16
let font_scale = 1.25
let h6 = font_base / font_base
let h5 = h6 * font_scale
let h4 = h5 * font_scale
let h3 = h4 * font_scale
let h2 = h3 * font_scale
let h1 = h2 * font_scale

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "=2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        text: "#27aaee",
        heading: "#e00909",
        primary: "#56cc3c",
        secondary: "#ff00dd",
        body: "#dcfcfa",
        border: "#e9e9e9",
      },
      fontSize: {
        base: font_base + "px",
        h1: h1 + "rem",
        "h1-sm": h1 * 0.8 + "rem",
        h2: h2 + "rem",
        "h2-sm": h2 * 0.8 + "rem",
        h3: h3 + "rem",
        "h3-sm": h3 * 0.8 + "rem",
        h4: h4 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
    },
  },
  plugins: [],
}
