/** @type {import('tailwindcss').Config} */
export default {
  // Paths to all template files
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom soft shadows to match the reference UI
      boxShadow: {
        soft: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
