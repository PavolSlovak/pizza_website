/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brightRed: "#DB162F",
      },
      /*    screens: {
        sm: "640px", // Ensure this is defined
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      }, */
    },
  },
  plugins: [],
};
