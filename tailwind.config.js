/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        surface: "#111827",
        primary: "#4F46E5",
        secondary: "#7C3AED",
        glass: "rgba(255,255,255,0.05)"
      }
    }
  },
  plugins: []
};