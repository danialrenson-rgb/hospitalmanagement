/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Urbanist", "sans-serif"] },
      colors: {
        primary: "#6AB8FF",
        accent: "#CFA3F6",
        ink: "#2C3137",
      },
    },
  },
  plugins: [],
};
