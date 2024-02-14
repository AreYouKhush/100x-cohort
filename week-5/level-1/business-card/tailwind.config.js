/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 5px rgba(218, 218, 218, 0.25)",
          "0 0px 15px rgba(218, 218, 218, 0.2)",
        ],
        deepglow: [
          "0 0px 10px rgba(218, 218, 218, 0.25)",
          "0 0px 20px rgba(218, 218, 218, 0.2)",
        ],
      },
    },
  },
  plugins: [],
};
